//  https://exclusions.oig.hhs.gov

const https = require("https");
const axios = require("axios");
const { JSDOM } = require("jsdom");

const getInputTags = (htmlString) => {
  const inputTags = {};
  const regex = /<input[^>]*name="([^"]*)"[^>]*value="([^"]*)"[^>]*>/gi;
  let match;

  while ((match = regex.exec(htmlString)) !== null) {
    if (
      match[1] === "__EVENTVALIDATION" ||
      match[1] === "__VIEWSTATE" ||
      match[1] === "__VIEWSTATEGENERATOR"
    )
      inputTags[match[1]] = match[2];
  }

  return inputTags;
};

const function8 = async (
  inputValues,
  AWSALBMatch,
  AWSALBCORSMatch,
  sessionIdMatch,
  first,
  last,
  ssn,
  count,
  index,
  finalresult,
  searchresult
) => {
  const data = {
    ...inputValues,
    __EVENTTARGET: "ctl00$cpExclusions$lbBackToSearch",
    __EVENTARGUMENT: "",
    __SCROLLPOSITIONX: "0",
    __SCROLLPOSITIONY: "0",
  };

  const params = new URLSearchParams(data).toString();

  const options = {
    hostname: "exclusions.oig.hhs.gov",
    path: "/Verify.aspx",
    method: "POST",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      Cookie: `AWSALB=${AWSALBMatch}; AWSALBCORS=${AWSALBCORSMatch}; AspxAutoDetectCookieSupport=1; ASP.NET_SessionId=${sessionIdMatch}; _ga=GA1.1.1171615623.1720673614; _ga_CSLL4ZEK4L=GS1.1.1720673256.2.1.1720673614.0.0.0; _ga_3YLR8EGLBW=GS1.1.1720673614.1.0.1720673849.60.0.0; _ga_8RZ83J1052=GS1.1.1720673849.1.0.1720673849.60.0.0`,
      Origin: "https://exclusions.oig.hhs.gov",
      Referer: "https://exclusions.oig.hhs.gov/Verify.aspx",
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
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(params),
    },
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`8 - Status code: ${res.statusCode}`);

      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        const setCookieHeader = res.headers["set-cookie"].toString();
        let AWSALBMatch = "";
        let AWSALBCORSMatch = "";
        if (res.statusCode === 302 && setCookieHeader) {
          const AWSALB = /AWSALB=([^;]+)/;
          const AWSALBCORS = /AWSALBCORS=([^;]+)/;
          AWSALBMatch = setCookieHeader.match(AWSALB)[1];
          AWSALBCORSMatch = setCookieHeader.match(AWSALBCORS)[1];
          resolve(
            function4(
              AWSALBMatch,
              AWSALBCORSMatch,
              sessionIdMatch,
              first,
              last,
              ssn,
              count,
              index,
              finalresult,
              searchresult
            )
          );
        } else {
          console.log("Set-Cookie not found");
        }
      });
    });

    req.on("error", (error) => {
      console.error(`Error: ${error.message}`);
    });

    req.write(params);

    req.end();
  });
};

const function7 = (
  inputValues,
  AWSALBMatch,
  AWSALBCORSMatch,
  sessionIdMatch,
  first,
  last,
  ssn,
  count,
  index,
  finalresult,
  searchresult
) => {
  const data = {
    ...inputValues,
    __EVENTTARGET: "",
    __EVENTARGUMENT: "",
    __SCROLLPOSITIONX: "0",
    __SCROLLPOSITIONY: "0",
    ctl00$ScriptManager1:
      "ctl00$cpExclusions$UpdatePanel1|ctl00$cpExclusions$ibtnVerify",
    ctl00$cpExclusions$txtSSN: ssn,
    __ASYNCPOST: true,
    "ctl00$cpExclusions$ibtnVerify.x": 46,
    "ctl00$cpExclusions$ibtnVerify.y": 16,
  };

  const params = new URLSearchParams(data).toString();

  const config = {
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9,ar;q=0.8,ko;q=0.7",
      "Cache-Control": "no-cache",
      pragma: "no-cache",
      Cookie: `AWSALB=${AWSALBMatch}; AWSALBCORS=${AWSALBCORSMatch}; ASP.NET_SessionId=${sessionIdMatch}; _ga=GA1.1.1171615623.1720673614; _ga_CSLL4ZEK4L=GS1.1.1720673256.2.1.1720673614.0.0.0; _ga_3YLR8EGLBW=GS1.1.1720673614.1.0.1720673849.60.0.0; _ga_8RZ83J1052=GS1.1.1720673849.1.0.1720673849.60.0.0`,
      Origin: "https://exclusions.oig.hhs.gov",
      priority: "u=1,i",
      Referer: "https://exclusions.oig.hhs.gov/Verify.aspx",
      "Sec-Ch-Ua":
        '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"Windows"',
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      "x-microsoftajax": "Delta=true",
      "x-requested-with": "XMLHttpRequest",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Content-Length": Buffer.byteLength(params),
    },
  };

  return new Promise((resolve) => {
    axios
      .post("https://exclusions.oig.hhs.gov/Verify.aspx", data, config)
      .then((response) => {
        const status = response.data.includes("verify-no-match");
        // resolve({ status, result: [] });
        if (!status) {
          finalresult = [...finalresult, searchresult[index - 1]];
        }
        resolve(
          function8(
            inputValues,
            AWSALBMatch,
            AWSALBCORSMatch,
            sessionIdMatch,
            first,
            last,
            ssn,
            count,
            index,
            finalresult,
            searchresult
          )
        );
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  });
};

const function6 = async (
  AWSALBMatch,
  AWSALBCORSMatch,
  sessionIdMatch,
  first,
  last,
  ssn,
  count,
  index,
  finalresult,
  searchresult
) => {
  const options = {
    hostname: "exclusions.oig.hhs.gov",
    path: "/Verify.aspx",
    method: "GET",
    headers: {
      Cookie: `AWSALB=${AWSALBMatch}; AWSALBCORS=${AWSALBCORSMatch}; AspxAutoDetectCookieSupport=1; ASP.NET_SessionId=${sessionIdMatch}; _ga=GA1.1.693727957.1720673257; _ga_CSLL4ZEK4L=GS1.1.1720673256.2.1.1720673257.0.0.0; _ga_3YLR8EGLBW=GS1.1.1720673257.1.1.1720673387.60.0.0; _ga_8RZ83J1052=GS1.1.1720673387.1.0.1720673387.60.0.0`,
    },
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`6 - Status code: ${res.statusCode}`);

      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        const setCookieHeader = res.headers["set-cookie"].toString();
        let AWSALBMatch = "";
        let AWSALBCORSMatch = "";
        if (setCookieHeader) {
          const AWSALB = /AWSALB=([^;]+)/;
          const AWSALBCORS = /AWSALBCORS=([^;]+)/;
          AWSALBMatch = setCookieHeader.match(AWSALB)[1];
          AWSALBCORSMatch = setCookieHeader.match(AWSALBCORS)[1];
          let inputValues = getInputTags(responseData);
          resolve(
            function7(
              inputValues,
              AWSALBMatch,
              AWSALBCORSMatch,
              sessionIdMatch,
              first,
              last,
              ssn,
              count,
              index,
              finalresult,
              searchresult
            )
          );
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

const function5 = async (
  inputValues,
  AWSALBMatch,
  AWSALBCORSMatch,
  sessionIdMatch,
  first,
  last,
  ssn,
  count,
  index,
  finalresult,
  searchresult
) => {
  const data = {
    ...inputValues,
    __EVENTTARGET: `ctl00$cpExclusions$gvEmployees$ctl0${index + 1}$cmdVerify2`,
    __EVENTARGUMENT: "",
    // __VIEWSTATEGENERATOR: "CA0B0334",
    __SCROLLPOSITIONX: "0",
    __SCROLLPOSITIONY: "0",
  };

  const params = new URLSearchParams(data).toString();

  const options = {
    hostname: "exclusions.oig.hhs.gov",
    path: "/SearchResults.aspx",
    method: "POST",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      Cookie: `AWSALB=${AWSALBMatch}; AWSALBCORS=${AWSALBCORSMatch}; AspxAutoDetectCookieSupport=1; ASP.NET_SessionId=${sessionIdMatch}; _ga=GA1.1.1171615623.1720673614; _ga_CSLL4ZEK4L=GS1.1.1720673256.2.1.1720673614.0.0.0; _ga_3YLR8EGLBW=GS1.1.1720673614.1.0.1720673849.60.0.0; _ga_8RZ83J1052=GS1.1.1720673849.1.0.1720673849.60.0.0`,
      Origin: "https://exclusions.oig.hhs.gov",
      Referer: "https://exclusions.oig.hhs.gov/SearchResults.aspx",
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
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(params),
    },
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`5 - Status code: ${res.statusCode}`);

      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        const setCookieHeader = res.headers["set-cookie"].toString();
        let AWSALBMatch = "";
        let AWSALBCORSMatch = "";
        if (res.statusCode === 302 && setCookieHeader) {
          const AWSALB = /AWSALB=([^;]+)/;
          const AWSALBCORS = /AWSALBCORS=([^;]+)/;
          AWSALBMatch = setCookieHeader.match(AWSALB)[1];
          AWSALBCORSMatch = setCookieHeader.match(AWSALBCORS)[1];
          resolve(
            function6(
              AWSALBMatch,
              AWSALBCORSMatch,
              sessionIdMatch,
              first,
              last,
              ssn,
              count,
              index,
              finalresult,
              searchresult
            )
          );
        } else {
          console.log("Set-Cookie not found");
        }
      });
    });

    req.on("error", (error) => {
      console.error(`Error: ${error.message}`);
    });

    req.write(params);

    req.end();
  });
};

const function4 = async (
  AWSALBMatch,
  AWSALBCORSMatch,
  sessionIdMatch,
  first,
  last,
  ssn,
  count = 0,
  index = 0,
  finalresult = [],
  searchresult = []
) => {
  const options = {
    hostname: "exclusions.oig.hhs.gov",
    path: "/SearchResults.aspx",
    method: "GET",
    headers: {
      Cookie: `AWSALB=${AWSALBMatch}; AWSALBCORS=${AWSALBCORSMatch}; AspxAutoDetectCookieSupport=1; ASP.NET_SessionId=${sessionIdMatch}; _ga=GA1.1.693727957.1720673257; _ga_CSLL4ZEK4L=GS1.1.1720673256.2.1.1720673257.0.0.0; _ga_3YLR8EGLBW=GS1.1.1720673257.1.1.1720673387.60.0.0; _ga_8RZ83J1052=GS1.1.1720673387.1.0.1720673387.60.0.0`,
    },
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`4 - Status code: ${res.statusCode}`);

      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        // console.log(responseData);
        const status = responseData.includes("no results are found");
        let result = [];
        if (!status && index === 0) {
          const dom = new JSDOM(responseData);
          const document = dom.window.document;
          const table = document.getElementById(
            "ctl00_cpExclusions_gvEmployees"
          );
          if (table) {
            const keys = [
              "lastName",
              "firstName",
              "middleName",
              "general",
              "specialty",
              "exclusion",
              "waiver",
            ];
            const trNodeList = table.querySelectorAll("tr");
            const trArray = Array.from(trNodeList).slice(1);
            trArray.forEach((tr) => {
              const tdList = tr.querySelectorAll("td");
              let trObject = {};
              const tdArray = Array.from(tdList);
              for (let i = 0; i < keys.length; i++) {
                if (tdArray[i]?.textContent)
                  trObject[keys[i]] = tdArray[i].textContent
                    .replace("\n", "")
                    .trim();
              }
              result.push(trObject);
            });
          }
          count = result.length;
        }
        if (result.length) {
          searchresult = result;
          count = result.length;
        }
        if (!status && ssn && index !== count) {
          let inputValues = getInputTags(responseData);
          resolve(
            function5(
              inputValues,
              AWSALBMatch,
              AWSALBCORSMatch,
              sessionIdMatch,
              first,
              last,
              ssn,
              count,
              index + 1,
              finalresult,
              searchresult
            )
          );
        } else {
          result = ssn ? finalresult : searchresult;
          resolve({
            status: result.length ? false : true,
            result,
          });
        }
      });
    });

    req.on("error", (error) => {
      console.error(`Error: ${error.message}`);
    });

    req.end();
  });
};

const function3 = async (
  inputValues,
  AWSALBMatch,
  AWSALBCORSMatch,
  sessionIdMatch,
  first,
  last,
  ssn
) => {
  const data = {
    ...inputValues,
    __EVENTTARGET: "",
    __EVENTARGUMENT: "",
    __VIEWSTATEGENERATOR: "CA0B0334",
    __SCROLLPOSITIONX: "0",
    __SCROLLPOSITIONY: "200",
    "ctl00$cpExclusions$ibSearchSP.x": "48",
    "ctl00$cpExclusions$ibSearchSP.y": "8",
    ctl00$cpExclusions$txtSPLastName: last,
    ctl00$cpExclusions$txtSPFirstName: first,
  };

  const params = new URLSearchParams(data).toString();

  const options = {
    hostname: "exclusions.oig.hhs.gov",
    path: "/?AspxAutoDetectCookieSupport=1",
    method: "POST",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      Cookie: `AWSALB=${AWSALBMatch}; AWSALBCORS=${AWSALBCORSMatch}; AspxAutoDetectCookieSupport=1; ASP.NET_SessionId=${sessionIdMatch}; _ga=GA1.1.1171615623.1720673614; _ga_CSLL4ZEK4L=GS1.1.1720673256.2.1.1720673614.0.0.0; _ga_3YLR8EGLBW=GS1.1.1720673614.1.0.1720673849.60.0.0; _ga_8RZ83J1052=GS1.1.1720673849.1.0.1720673849.60.0.0`,
      Origin: "https://exclusions.oig.hhs.gov",
      Referer: "https://exclusions.oig.hhs.gov/?AspxAutoDetectCookieSupport=1",
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
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(params),
    },
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        const setCookieHeader = res.headers["set-cookie"].toString();
        // console.log(res.headers)
        let AWSALBMatch = "";
        let AWSALBCORSMatch = "";
        if (res.statusCode === 302 && setCookieHeader) {
          const AWSALB = /AWSALB=([^;]+)/;
          const AWSALBCORS = /AWSALBCORS=([^;]+)/;
          AWSALBMatch = setCookieHeader.match(AWSALB)[1];
          AWSALBCORSMatch = setCookieHeader.match(AWSALBCORS)[1];
          resolve(
            function4(
              AWSALBMatch,
              AWSALBCORSMatch,
              sessionIdMatch,
              first,
              last,
              ssn
            )
          );
        } else {
          console.log("Set-Cookie not found");
        }
      });
    });

    req.on("error", (error) => {
      console.error(`Error: ${error.message}`);
    });

    req.write(params);

    req.end();
  });
};

const function2 = async (
  AWSALBMatch,
  AWSALBCORSMatch,
  AspxAutoDetectCookieSupportMatch,
  first,
  last,
  ssn
) => {
  const options = {
    hostname: "exclusions.oig.hhs.gov",
    path: "/?AspxAutoDetectCookieSupport=1",
    method: "GET",
    headers: {
      Cookie: `AWSALB=${AWSALBMatch}; AWSALBCORS=${AWSALBCORSMatch}; AspxAutoDetectCookieSupport=${AspxAutoDetectCookieSupportMatch}`,
    },
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        const setCookieHeader = res.headers["set-cookie"].toString();
        let AWSALBMatch = "";
        let AWSALBCORSMatch = "";
        let sessionIdMatch = "";
        if (res.statusCode === 200 && setCookieHeader) {
          const AWSALB = /AWSALB=([^;]+)/;
          const AWSALBCORS = /AWSALBCORS=([^;]+)/;
          const sessionId = /ASP.NET_SessionId=([^;]+)/;
          AWSALBMatch = setCookieHeader.match(AWSALB)[1];
          AWSALBCORSMatch = setCookieHeader.match(AWSALBCORS)[1];
          sessionIdMatch = setCookieHeader.match(sessionId)[1];
          let inputValues = getInputTags(responseData);

          resolve(
            function3(
              inputValues,
              AWSALBMatch,
              AWSALBCORSMatch,
              sessionIdMatch,
              first,
              last,
              ssn
            )
          );
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

const function1 = async (first, last, ssn) => {
  const options = {
    hostname: "exclusions.oig.hhs.gov",
    path: "/",
    method: "GET",
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        const setCookieHeader = res.headers["set-cookie"].toString();
        let AWSALBMatch = "";
        let AWSALBCORSMatch = "";
        let AspxAutoDetectCookieSupportMatch = "";
        if (res.statusCode === 302 && setCookieHeader) {
          const AWSALB = /AWSALB=([^;]+)/;
          const AWSALBCORS = /AWSALBCORS=([^;]+)/;
          const AspxAutoDetectCookieSupport =
            /AspxAutoDetectCookieSupport=([^;]+)/;
          AWSALBMatch = setCookieHeader.match(AWSALB)[1];
          AWSALBCORSMatch = setCookieHeader.match(AWSALBCORS)[1];
          AspxAutoDetectCookieSupportMatch = setCookieHeader.match(
            AspxAutoDetectCookieSupport
          )[1];

          resolve(
            function2(
              AWSALBMatch,
              AWSALBCORSMatch,
              AspxAutoDetectCookieSupportMatch,
              first,
              last,
              ssn
            )
          );
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

const exclusions_oig_api = async (first, last, ssn) => {
  try {
    const result = await function1(first, last, ssn);
    return result;
  } catch (e) {}
};

module.exports = {
  exclusions_oig_api,
};

// exclusions_oig_api("John", "Smith", 918630576);
