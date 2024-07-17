//  https://profile.tmb.state.tx.us/Search.aspx
const { query } = require("express");
const https = require("https");
const { JSDOM } = require("jsdom");

const getInputTags = (htmlString, filters = []) => {
  const inputTags = {};
  const regex = /<input[^>]*name="([^"]*)"[^>]*value="([^"]*)"[^>]*>/gi;
  let match;

  while ((match = regex.exec(htmlString)) !== null) {
    if (filters.length) {
      if (filters.includes(match[1])) {
        inputTags[match[1]] = match[2];
      }
    } else {
      inputTags[match[1]] = match[2];
    }
  }

  return inputTags;
};

const function4 = async (sessionid, query) => {
  const options = {
    hostname: "profile.tmb.state.tx.us",
    path: "/SearchResults.aspx?" + query,
    method: "GET",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      Cookie: "ASP.NET_SessionId=" + sessionid,
      Referer: "https://profile.tmb.state.tx.us/Search.aspx?" + query,
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
        const status = responseData.includes("No Results Found");
        let result = [];
        if (!status) {
          const dom = new JSDOM(responseData);
          const document = dom.window.document;
          const table = document.getElementById("BodyContent_gvSearchResults");
          if (table) {
            const keys = [
              "name",
              "license",
              "type",
              "address",
              "city",
              "boardActions",
            ];
            const trNodeList = table.querySelectorAll("tr");
            const trArray = Array.from(trNodeList).slice(1);
            trArray.forEach((tr) => {
              const tdList = tr.querySelectorAll("td");
              let trObject = {};
              const tdArray = Array.from(tdList);
              for (let i = 0; i < keys.length; i++) {
                trObject[keys[i]] = tdArray[i].textContent
                  .replace(/\s{2,}/g, " ")
                  .trim();
              }
              result.push(trObject);
            });
          }
        }
        resolve({ status, result });
      });
    });

    req.on("error", (error) => {
      console.error(`Error: ${error.message}`);
    });

    req.end();
  });
};

const function3 = async (sessionid, query, input, first, last) => {
  const data = {
    ...input,
    __LASTFOCUS: "",
    __EVENTTARGET: "",
    __EVENTARGUMENT: "",
    __SCROLLPOSITIONX: "0",
    __SCROLLPOSITIONY: "0",
    ctl00$hfWindowID: query,
    ctl00$BodyContent$tbLastName: last,
    ctl00$BodyContent$tbFirstName: first,
    ctl00$BodyContent$tbLicense: "",
    ctl00$BodyContent$ddLicenseType: "ALL",
    ctl00$BodyContent$tbCity: "",
    ctl00$BodyContent$tbZIP: "",
    ctl00$BodyContent$ddBACategory: "ALL",
    ctl00$BodyContent$tbBADate: "",
    ctl00$BodyContent$tbBADateRangeEnd: "",
    ctl00$BodyContent$btnSearch: "Search",
  };

  const params = new URLSearchParams(data).toString();

  const options = {
    hostname: "profile.tmb.state.tx.us",
    path: "/Search.aspx?" + query,
    method: "POST",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      "Content-Length": Buffer.byteLength(params),
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: "ASP.NET_SessionId=" + sessionid,
      Origin: "https://profile.tmb.state.tx.us",
      Referer: "https://profile.tmb.state.tx.us/Search.aspx?" + query,
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
    },
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`Status code: ${res.statusCode}`);

      if (res.statusCode === 302) {
        resolve(function4(sessionid, query));
      } else {
        console.log("something went wrong");
      }
    });

    req.on("error", (error) => {
      console.error(`Error: ${error.message}`);
    });

    req.write(params);

    req.end();
  });
};

const function3_ = (sessionid, query, first, last) => {
  const options = {
    hostname: "profile.tmb.state.tx.us",
    path: "/Search.aspx?" + query,
    method: "GET",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      Cookie: "ASP.NET_SessionId=" + sessionid,
      Referer: "https://profile.tmb.state.tx.us/Search.aspx",
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
        if (res.statusCode === 200) {
          const input = getInputTags(responseData, [
            "__VIEWSTATE",
            "__VIEWSTATEGENERATOR",
            "__EVENTVALIDATION",
          ]);
          resolve(function3(sessionid, query, input, first, last));
        }
      });
    });

    req.on("error", (error) => {
      console.error(`Error: ${error.message}`);
    });

    req.end();
  });
};

const function2 = async (sessionid, input, first, last) => {
  const data = {
    ...input,
    __LASTFOCUS: "",
    __EVENTTARGET: "",
    __EVENTARGUMENT: "",
    __SCROLLPOSITIONX: "0",
    __SCROLLPOSITIONY: "0",
    ctl00$hfWindowID: "",
    ctl00$BodyContent$btnAccept: "I Accept the Usage Terms",
  };

  const params = new URLSearchParams(data).toString();

  const options = {
    hostname: "profile.tmb.state.tx.us",
    path: "/SearchNotice.aspx",
    method: "POST",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      "Content-Length": Buffer.byteLength(params),
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: "ASP.NET_SessionId=" + sessionid,
      Origin: "https://profile.tmb.state.tx.us",
      Referer: "https://profile.tmb.state.tx.us/Search.aspx",
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
    },
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`Status code: ${res.statusCode}`);

      if (res.statusCode === 302) {
        const url = res.headers["location"];
        const value = url.substring(url.indexOf("?") + 1);
        if (value) {
          resolve(function3_(sessionid, value, first, last));
        } else {
          console.log("parameter not found");
        }
      }
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
    hostname: "profile.tmb.state.tx.us",
    path: "/Search.aspx",
    method: "GET",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Sec-Ch-Ua":
        '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"Windows"',
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
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
        const setCookieHeader = res.headers["set-cookie"];
        let sessionIdMatch = "";
        if (res.statusCode === 200 && setCookieHeader) {
          const input = getInputTags(responseData, [
            "__VIEWSTATE",
            "__VIEWSTATEGENERATOR",
            "__EVENTVALIDATION",
          ]);
          const sessionIdRegex = /ASP.NET_SessionId=([^;]+)/;
          sessionIdMatch = setCookieHeader[0].match(sessionIdRegex)[1];
          resolve(function2(sessionIdMatch, input, first, last));
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

const profile_tmb_api = async (first, last) => {
  try {
    const status = await function1(first, last);
    return status;
  } catch (e) {}
};

module.exports = {
  profile_tmb_api,
};
