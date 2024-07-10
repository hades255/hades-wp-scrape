const https = require('https');

//  https://exclusions.oig.hhs.gov/SearchResults.aspx

const getInputTags = (htmlString) => {
  const inputTags = {};
  const regex = /<input[^>]*name="([^"]*)"[^>]*value="([^"]*)"[^>]*>/gi;
  let match;

  while ((match = regex.exec(htmlString)) !== null) {
    inputTags[match[1]] = match[2];
  }

  return inputTags;
}

const function3 = (inputValues, AWSALBMatch, AWSALBCORSMatch, sessionIdMatch) => {
  const data = {
    ...inputValues,
    "ctl00$cpExclusions$txtSPLastName": "",
    "ctl00$cpExclusions$txtSPFirstName": "Margaret"
  };

  const params = new URLSearchParams(data).toString();

  const options = {
    hostname: 'exclusions.oig.hhs.gov',
    path: '/?AspxAutoDetectCookieSupport=1',
    method: 'POST',
    headers: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      Cookie: `AWSALB=${AWSALBMatch}; AWSALBCORS=${AWSALBCORSMatch}; AspxAutoDetectCookieSupport=1; ASP.NET_SessionId=${sessionIdMatch}; _ga=GA1.1.1877357990.1720536562; _ga_CSLL4ZEK4L=GS1.1.1720533657.1.1.1720536561.0.0.0; _ga_3YLR8EGLBW=GS1.1.1720536561.1.1.1720537679.60.0.0`,
      "Origin": "https://exclusions.oig.hhs.gov",
      "Referer": "https://exclusions.oig.hhs.gov/?AspxAutoDetectCookieSupport=1",
      "Sec-Ch-Ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": "\"Windows\"",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      "Content-Type": "multipart/form-data",
      'Content-Length': Buffer.byteLength(params),
    },
  };

  const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);

    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      const setCookieHeader = res.headers['set-cookie'].toString();
      // console.log(res.headers)
      let AWSALBMatch = "";
      let AWSALBCORSMatch = "";
      if (res.statusCode === 302 && setCookieHeader) {
        const AWSALB = /AWSALB=([^;]+)/;
        const AWSALBCORS = /AWSALBCORS=([^;]+)/;
        AWSALBMatch = setCookieHeader.match(AWSALB)[1];
        AWSALBCORSMatch = setCookieHeader.match(AWSALBCORS)[1];
        console.log(AWSALBMatch, AWSALBCORSMatch, sessionIdMatch);

        setTimeout(() => {
          // function3(inputValues, AWSALBMatch, AWSALBCORSMatch, sessionIdMatch);
        }, 1000);
      } else {
        console.log("Set-Cookie not found");
      }
    });
  });

  req.on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });

  req.write(params);

  req.end();
}

const function2 = (AWSALBMatch, AWSALBCORSMatch, AspxAutoDetectCookieSupportMatch) => {
  const options = {
    hostname: 'exclusions.oig.hhs.gov',
    path: '/?AspxAutoDetectCookieSupport=1',
    method: 'GET',
    headers: {
      Cookie: `AWSALB=${AWSALBMatch}; AWSALBCORS=${AWSALBCORSMatch}; AspxAutoDetectCookieSupport=${AspxAutoDetectCookieSupportMatch}`
    }
  };

  const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);

    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      const setCookieHeader = res.headers['set-cookie'].toString();
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
        console.log(AWSALBMatch, AWSALBCORSMatch, sessionIdMatch);
        let inputValues = getInputTags(responseData);
        // console.log(inputValues);

        setTimeout(() => {
          function3(inputValues, AWSALBMatch, AWSALBCORSMatch, sessionIdMatch);
        }, 1000);
      } else {
        console.log("Set-Cookie not found");
      }
    });
  });

  req.on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });

  req.end();
}

const function1 = () => {
  const options = {
    hostname: 'exclusions.oig.hhs.gov',
    path: '/',
    method: 'GET',
  };

  const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);

    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      const setCookieHeader = res.headers['set-cookie'].toString();
      let AWSALBMatch = "";
      let AWSALBCORSMatch = "";
      let AspxAutoDetectCookieSupportMatch = "";
      if (res.statusCode === 302 && setCookieHeader) {
        const AWSALB = /AWSALB=([^;]+)/;
        const AWSALBCORS = /AWSALBCORS=([^;]+)/;
        const AspxAutoDetectCookieSupport = /AspxAutoDetectCookieSupport=([^;]+)/;
        AWSALBMatch = setCookieHeader.match(AWSALB)[1];
        AWSALBCORSMatch = setCookieHeader.match(AWSALBCORS)[1];
        AspxAutoDetectCookieSupportMatch = setCookieHeader.match(AspxAutoDetectCookieSupport)[1];
        console.log(AWSALBMatch, AWSALBCORSMatch, AspxAutoDetectCookieSupportMatch);

        setTimeout(() => {
          function2(AWSALBMatch, AWSALBCORSMatch, AspxAutoDetectCookieSupportMatch);
        }, 1000);
      } else {
        console.log("Set-Cookie not found");
      }
    });
  });

  req.on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });

  req.end();
}

function1();
// function2("");