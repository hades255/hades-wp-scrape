//  https://oig.hhsc.state.tx.us/oigportal2/Exclusions

const https = require("https");
const { JSDOM } = require("jsdom");

const getInputTags = (htmlString) => {
  const inputTags = {};
  const regex = /<input[^>]*name="([^"]*)"[^>]*value="([^"]*)"[^>]*>/gi;
  let match;

  while ((match = regex.exec(htmlString)) !== null) {
    if (match[1] === "dnn$ctr384$Search$btnClear") break;
    inputTags[match[1]] = match[2];
  }

  return inputTags;
};

function toMultipartFormData(data, boundary) {
  const formData = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.push(`--${boundary}`);
      formData.push(`Content-Disposition: form-data; name="${key}"`);
      formData.push("");
      formData.push(data[key]);
    }
  }

  formData.push(`--${boundary}--`);

  return formData.join("\r\n");
}

const function2 = async (sessionid, inputValues, first, last) => {
  const data = {
    ...inputValues,
    dnn$ctr384$Search$txtLast1: last,
    dnn$ctr384$Search$txtFirst1: first,
  };
  const boundary = "----WebKitFormBoundary4hQR8axLA2PEBlBY";
  const params = toMultipartFormData(data, boundary);

  const options = {
    hostname: "oig.hhsc.state.tx.us",
    path: "/oigportal2/Exclusions",
    method: "POST",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      Cookie:
        ".ASPXANONYMOUS=" + sessionid + "; dnn_IsMobile=False; language=en-US",
      Origin: "https://oig.hhsc.state.tx.us",
      Referer: "https://oig.hhsc.state.tx.us/oigportal2/Exclusions",
      "Sec-Ch-Ua":
        '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"Windows"',
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      "Content-Type":
        "multipart/form-data; boundary=----WebKitFormBoundary4hQR8axLA2PEBlBY",
      "Content-Length": Buffer.byteLength(params),
    },
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`Status code: ${res.statusCode}`);

      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        const status = responseData.includes("No search result(s) found.");
        const dom = new JSDOM(responseData);
        const document = dom.window.document;
        const table = document.getElementById("dnn_ctr384_Search_gv_Results");
        let result = [];
        if (table) {
          const keys = [
            "lastName",
            "firstName",
            "mi",
            "company",
            "occupation",
            "license",
            "npi",
            "startDate",
            "addDate",
            "deinstatedDate",
            "eligibleToReapplyDate",
            "waiver",
            "webComments",
          ];
          const trNodeList = table.querySelectorAll("tr");
          const trArray = Array.from(trNodeList).slice(1);
          trArray.forEach((tr) => {
            const tdList = tr.querySelectorAll("td");
            let trObject = {};
            const tdArray = Array.from(tdList);
            for (let i = 0; i < keys.length; i++) {
              if (tdArray[i].textContent)
                trObject[keys[i]] = tdArray[i].textContent;
            }
            result.push(trObject);
          });
        }
        resolve({ status, result });
      });
    });

    req.on("error", (error) => {
      console.error(`Error: ${error.message}`);
    });

    req.write(params);

    req.end();
  });
};

const function1 = async (first, last) => {
  const options = {
    hostname: "oig.hhsc.state.tx.us",
    path: "/oigportal2/Exclusions",
    method: "GET",
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`Status code: ${res.statusCode}`);

      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        const setCookieHeader = res.headers["set-cookie"].toString();
        let sessionIdMatch = "";
        if (res.statusCode === 200 && setCookieHeader) {
          const sessionIdRegex = /.ASPXANONYMOUS=([^;]+)/;
          sessionIdMatch = setCookieHeader.match(sessionIdRegex)[1];
          console.log(sessionIdMatch);

          let inputValues = getInputTags(responseData);
          resolve(function2(sessionIdMatch, inputValues, first, last));
        } else {
          console.log("Set-Cookie not found");
        }
      });
    });

    req.on("error", (error) => {
      console.error(`Error: ${error.message}`);
    });

    req.end();
  });
};

const oig_hhsc_api = async (first, last) => {
  try {
    const result = await function1(first, last);
    return result;
  } catch (e) {}
};

module.exports = {
  oig_hhsc_api,
};
