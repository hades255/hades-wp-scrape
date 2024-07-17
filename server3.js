//  https://profile.tmb.state.tx.us/Search.aspx
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

const function4 = (sessionid, query) => {
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

  const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);

    let responseData = "";

    res.on("data", (chunk) => {
      responseData += chunk;
    });

    res.on("end", () => {
      // console.log(`Response data: ${responseData}`);
      console.log(
        `Response data True: ${responseData.includes("No Results Found")}`
      );
      console.log(result);
    });
  });

  req.on("error", (error) => {
    console.error(`Error: ${error.message}`);
  });

  req.end();
};

const function3 = (sessionid, query, input) => {
  const data = {
    ...input,
    __LASTFOCUS: "",
    __EVENTTARGET: "",
    __EVENTARGUMENT: "",
    __SCROLLPOSITIONX: "0",
    __SCROLLPOSITIONY: "0",
    ctl00$hfWindowID: query,
    ctl00$BodyContent$tbLastName: "Bell",
    ctl00$BodyContent$tbFirstName: "Margaret",
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

  const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);

    if (res.statusCode === 302) {
      function4(sessionid, query);
    } else {
      console.log("something went wrong");
    }
  });

  req.on("error", (error) => {
    console.error(`Error: ${error.message}`);
  });

  req.write(params);

  req.end();
};

const function3_ = (sessionid, query) => {
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
        function3(sessionid, query, input);
      }
    });
  });

  req.on("error", (error) => {
    console.error(`Error: ${error.message}`);
  });

  req.end();
};

const function2 = (sessionid, input) => {
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
      // 'Content-Length': '605',
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

  const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);

    if (res.statusCode === 302) {
      const url = res.headers["location"];
      const value = url.substring(url.indexOf("?") + 1);
      if (value) {
        function3_(sessionid, value);
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
};

const function1 = () => {
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
        function2(sessionIdMatch, input);
      } else {
        console.log("Set-Cookie not found");
      }
    });
  });

  req.on("error", (error) => {
    console.error(`Error: ${error.message}`);
  });

  req.end();
};

function1();
