const https = require('https');

//  https://oig.hhsc.state.tx.us/oigportal2/Exclusions

const function2 = (sessionid) => {
  const data = {
    "__EVENTTARGET": "",
    "__EVENTARGUMENT": "",
    "__VIEWSTATE": "rDHrarWahjVHD824oaS/vEARon88/kJB66/f0fCWQvOfSxFQn8ej+gwNuUmJAH/dMA5iVchU4h8i859aJjhNe1gUWaPjQyTnxychU1D6phk4bk2GI/SO+XulS401mC9Q5Fb4uoBUqnofeZp+OFXO1X7vNJBWBas7d5yjxSG14+m5yRRpN9AfE7pxWtaQQZiEF0qOpNa3pvdiRuMNV8uLDjhFE2E+EY8ONgHLFykxdpxo2+jvxDXV980GL82CE2TzVO9G/d1DaGbXhTpcE0/ejooqLx/BEY391XC3wcdbdSQ/N4ZZRVXQXadeTxXSs7W0VR03LenreUFrOG+G84B6M/jcygoi83t66tNTwSGNhcVhKa7NvY3LmEN4UuaOjJZmrFNLcIRDDx0rMj953QOCHcNfBJZiICrzcOdL/fatxyvlRSVgdxWhUPAAWSmKDMl210pvAQ==",
    "__VIEWSTATEGENERATOR": "B56C3D0F",
    "__VIEWSTATEENCRYPTED": "",
    "__EVENTVALIDATION": "Lt9gRQHREYzS/6mbTNqzpbWfdvFWsgl+Bg4c4sMXZ2SCrsOMLdQ67/PMOIPs58q5cqNzSba4d4YNSmwiFMsSq0X6Ynx6qlUvxBfWjk6tQzZS6yacyWIXsIGupCguL5nkaa88BHvVv+IBKF3qVr0/YDZRWFjXnwyL/zW7aI8VO7ZD1Ldb8/CxulScwCnlvaR12p+z8cHpwOPDIg+BkqqQDvbaL++kBQhe7+j0iDIHnMqQeF3rFN0LCaBGJFG5mmzg4Hornt2VY17MbOb8ArHWXbf4o0trSnBwR+dyyeeSAN/+ysgPboGhPw8DBg3yN0GDojTh8+ai9BxjdRTTP7/szuQla6cnYZoO2rT2SDuVy6oGc8FLkXzfdHvUL8JPWpK32KpU5L5CPnD17MQV/oqJwUgvUaAOCPvr9kykOZ8p7wnPyqzb3kwmCASLro7RxNgC0oU0kCANzh9bGZLxMdCeL2DcCvKerUcmu83gXklv/WWb+LasGq3Gk7WT2r3/+5C+ojE0ebVaUGAAEb3d/Pbjj8V0v4FfNZ52NTdHTluzCy/BTMc9NMI1JtdA2kcs+2ChLLk+fPsy9Jg/VaWnbprU4XFsFStUBrnjmRGvUNEM1TX0yqyJT6qSRKwugqsPdSbCZ3Kh0XUP9okqtX1c5dqc8eIQnK8=",
    "dnn$ctr384$Search$txtLast1": "",
    "dnn$ctr384$Search$txtFirst1": "Margaret",
    "dnn$ctr384$Search$txt_mi_1": "",
    "dnn$ctr384$Search$txtProv1": "",
    "dnn$ctr384$Search$txtLast2": "",
    "dnn$ctr384$Search$txtFirst2": "",
    "dnn$ctr384$Search$txt_mi_2": "",
    "dnn$ctr384$Search$txtProv2": "",
    "dnn$ctr384$Search$txtLast3": "",
    "dnn$ctr384$Search$txtFirst3": "",
    "dnn$ctr384$Search$txt_mi_3": "",
    "dnn$ctr384$Search$txtProv3": "",
    "dnn$ctr384$Search$txtLast4": "",
    "dnn$ctr384$Search$txtFirst4": "",
    "dnn$ctr384$Search$txt_mi_4": "",
    "dnn$ctr384$Search$txtProv4": "",
    "dnn$ctr384$Search$txtLast5": "",
    "dnn$ctr384$Search$txtFirst5": "",
    "dnn$ctr384$Search$txt_mi_5": "",
    "dnn$ctr384$Search$txtProv5": "",
    "dnn$ctr384$Search$btnSearch": "Search",
    "ScrollTop": "",
    "__dnnVariable": ""
  };

  const params = new URLSearchParams(data).toString();

  const options = {
    hostname: 'oig.hhsc.state.tx.us',
    path: '/oigportal2/Exclusions',
    method: 'POST',
    headers: {
      "Authority": "oig.hhsc.state.tx.us",
      "Method": "POST",
      "Path": "/oigportal2/Exclusions",
      "Scheme": "https",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      "Cookie": ".ASPXANONYMOUS=" + sessionid, // + "; dnn_IsMobile=False; language=en-US; ASP.NET_SessionId=elegddkysh5rryfzozg140yw",
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
      "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryMT7Xhb08BHnu6KE5",
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);

    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
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
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      'Sec-Ch-Ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    },
  };

  const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);

    const setCookieHeader = res.headers['set-cookie'];
    let sessionIdMatch = "";
    if (res.statusCode === 200 && setCookieHeader) {
      const sessionIdRegex = /.ASPXANONYMOUS=([^;]+)/;
      sessionIdMatch = setCookieHeader[0].match(sessionIdRegex)[1];
      console.log(sessionIdMatch);
      setTimeout(() => {
        function2(sessionIdMatch);
      }, 1000);
    } else {
      console.log("Set-Cookie not found");
    }

    res.on('end', () => {
    });
  });

  req.on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });

  req.end();
}

function1();