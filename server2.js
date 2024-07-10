const https = require('https');

// const parser = new DOMParser();
//  https://oig.hhsc.state.tx.us/oigportal2/Exclusions

const getInputTags = (htmlString) => {
  const inputTags = {};
  const regex = /<input[^>]*name="([^"]*)"[^>]*value="([^"]*)"[^>]*>/gi;
  let match;

  while ((match = regex.exec(htmlString)) !== null) {
    inputTags[match[1]] = match[2];
  }

  return inputTags;
}

const function2 = (sessionid, inputValues) => {
  const data = {
    ...inputValues,
    "dnn$ctr384$Search$txtFirst1": "Margaret"
  };

  const params = new URLSearchParams(data).toString();
  //  boundary=----WebKitFormBoundary2AJVQ19oCJ6BUuMA
  const options = {
    hostname: 'oig.hhsc.state.tx.us',
    path: '/oigportal2/Exclusions',
    method: 'POST',
    headers: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      "Cookie": ".ASPXANONYMOUS=" + sessionid + "; dnn_IsMobile=False; language=en-US",
      "Origin": "https://oig.hhsc.state.tx.us",
      "Referer": "https://oig.hhsc.state.tx.us/oigportal2/Exclusions",
      "Sec-Ch-Ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": "\"Windows\"",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      "Content-Type": "multipart/form-data",//  ; boundary=----WebKitFormBoundary4hQR8axLA2PEBlBY
      'Content-Length': Buffer.byteLength(params),
    },
  };
  console.log(options)

  const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);

    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      // console.log(responseData)
      console.log(`Response data True: ${responseData.includes('No search result(s) found.')}`);
    });
  });

  req.on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });

  req.write(params);

  req.end();
}

const function1 = () => {
  const options = {
    hostname: 'oig.hhsc.state.tx.us',
    path: '/oigportal2/Exclusions',
    method: 'GET',
  };

  const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);

    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      // console.log(res.headers)
      const setCookieHeader = res.headers['set-cookie'].toString();
      let sessionIdMatch = "";
      if (res.statusCode === 200 && setCookieHeader) {
        const sessionIdRegex = /.ASPXANONYMOUS=([^;]+)/;
        sessionIdMatch = setCookieHeader.match(sessionIdRegex)[1];
        console.log(sessionIdMatch);

        let inputValues = getInputTags(responseData);
        // console.log(inputValues)
        setTimeout(() => {
          function2(sessionIdMatch, inputValues);
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