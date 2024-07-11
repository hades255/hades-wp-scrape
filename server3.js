//  https://profile.tmb.state.tx.us/Search.aspx
const https = require('https');


const function4 = (sessionid, query) => {
  const options = {
    hostname: 'profile.tmb.state.tx.us',
    path: '/SearchResults.aspx' + query,
    method: 'GET',
    headers: {
      Authority: 'profile.tmb.state.tx.us',
      Method: 'GET',
      Path: '/SearchResults.aspx?' + query,
      Scheme: 'https',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'max-age=0',
      Cookie: 'ASP.NET_SessionId=' + sessionid,
      Referer: 'https://profile.tmb.state.tx.us/Search.aspx?' + query,
      'Sec-Ch-Ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    },
  };

  const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);

    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      // console.log(`Response data: ${responseData}`);
      console.log(`Response data True: ${responseData.includes('No Results Found')}`);
    });
  });

  req.on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });

  req.end();
}

const function3 = (sessionid, query) => {
  const data = {
    __LASTFOCUS: '',
    __EVENTTARGET: '',
    __EVENTARGUMENT: '',
    __VIEWSTATE: '/wEPDwUJNTE2NjM1Mjg1D2QWAmYPDxYCHghXaW5kb3dJRAUkZjg2YjQ2NjgtZmM1Ny00YTVkLWFhYjEtOWJhZDUxYmFhY2E1ZBYCAgMPZBYEAgkPZBYCAgEPZBYEAgMPZBYEAgMPEGQPFhRmAgECAgIDAgQCBQIGAgcCCAIJAgoCCwIMAg0CDgIPAhACEQISAhMWFBAFA0FMTAUDQUxMZxAFCEFjdWRldG94BQJBRGcQBQtBY3VwdW5jdHVyZQUCQUNnEAUqQWR2YW5jZWQgUHJhY3RpY2UgTnVyc2UgKERlbGVnYXRpb25zIE9ubHkpBQNBUE5nEAURTWVkaWNhbCBQaHlzaWNpc3QFAk1QZxAFIU1lZGljYWwgUmFkaW9sb2dpY2FsIFRlY2hub2xvZ2lzdAUDTVJUZxAFI05vbi1DZXJ0aWZpZWQgUmFkaW9sb2dpYyBUZWNobmljaWFuBQJOQ2cQBSxOb24tQ2VydGlmaWVkIFJhZGlvbG9naWMgVGVjaG5pY2lhbiBSZWdpc3RyeQUDTkNSZxAFFlBhaW4gTWFuYWdlbWVudCBDbGluaWMFA1BNQ2cQBQxQZXJmdXNpb25pc3QFAlBGZxAFBlBlcm1pdAUBUGcQBQlQaHlzaWNpYW4FA1BIWWcQBSItLS1QaHlzaWNpYW4gKEFkbWluaXN0cmF0aXZlIE9ubHkpBQlQSFktQURNSU5nEAUlLS0tUGh5c2ljaWFuIChDb25jZWRlZCBFbWluZW5jZSBPbmx5KQULUEhZLUNPTkNERU1nEAUhLS0tUGh5c2ljaWFuIChQdWJsaWMgSGVhbHRoIE9ubHkpBQpQSFktUEJITFRIZxAFIC0tLVBoeXNpY2lhbiAoVGVsZW1lZGljaW5lIE9ubHkpBQhQSFktVEVMRWcQBRNQaHlzaWNpYW4gQXNzaXN0YW50BQJQQWcQBRVQaHlzaWNpYW4gSW4gVHJhaW5pbmcFA1BJVGcQBR1SZXNwaXJhdG9yeSBDYXJlIFByYWN0aXRpb25lcgUDUkNQZxAFElN1cmdpY2FsIEFzc2lzdGFudAUCU0FnFgFmZAIFD2QWAgIBDxBkZBYAZAIHD2QWAgIBDxBkDxYCZgIBFgIQBQNBTEwFA0FMTGcQBQ5DZWFzZSAmIERlc2lzdAUDQ0FEZ2RkAgsPZBYEAgEPDxYCHgRUZXh0BSh2Mi4wLjAuNSBDb3B5cmlnaHTCqSBUZXhhcyBNZWRpY2FsIEJvYXJkZGQCAw8PFgIfAQUdLSBDaHJvbWUgOTMgIElQOjE2MS43Ny41My4yMTFkZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUmY3RsMDAkQm9keUNvbnRlbnQkY2JBY3RpdmVMaWNlbnNlc09ubHnw8SpROUohMzzvTlilKcavxJh+RQ==',
    __SCROLLPOSITIONX: '0',
    __SCROLLPOSITIONY: '0',
    __EVENTVALIDATION: '/wEdACMsz0uy1H1wD+GmcqjN5B0Shyyo1Yyn/QW5AH28caHT5hYs86mqdE5ap5pQxsKBJaRRpeij/32dhpxXZzm30Ylx1MUiRuDHhnWtGIK0I8oPrirqOWJHU7XvDDwBdWd3SLMwjlmk7nVs3u7scRbhFQ2X/X0IbEh3Mdn27GXgRXeTwXIjbUgXWq52WTDA4tVYciSZKeCTxhv9KtzHxdmk/AF5P7OoB3BULqSgTthbaxiNPkryhPO28qHOZp51iEfUn7q0w04NlV0aZ0UIw8WHr5K39mtP7X74LzVqM6H29LmqvmpEMDZQNdsCJIXaPkhOk8WGYN7XrlfVvAbUGFRdYhv4E1C4a70To6Fr3EbU6AFYwQlvkRsGIzY+augJIK8uGrZ1qOAatUDLBmwEqO7+DivILpXHqYXvISEi6PbWC1jm9M0ARXq5sZMUxBi5cSyKraWx2JoxWXh8xgJgxuDyBkdNpvCVQrH1tMHrECkV+DAvjRkQUnugxK8arbrA9B+VJzT5JsTo/MRHBMmAx5GVmw/K1eeeD5Z6QXUogCwT2M6XZNrV+68TFA5NEjwAfvQ4YUQ51jQ1nf8/+wwXVGM+9ht0ebOZWWJ01zv5T2cetKfVQnca/yHoP9FkpV7hWfVuGtSNz4lhLIzTYUrvrnD8byk+RV6nJVfpB4aPP9HL1jIxTY8X30MOIZq1j5tA3U+cAfz0y8Fm7BHcBwIWIQrMsHxk4Ke0feVDU1oKDp0CWqj1InMi5qJTn6Qok+DDa7Sq5pwEZUdE',
    'ctl00$hfWindowID': 'f86b4668-fc57-4a5d-aab1-9bad51baaca5',
    'ctl00$BodyContent$tbLastName': '',
    'ctl00$BodyContent$tbFirstName': 'Margaret',
    'ctl00$BodyContent$tbLicense': '',
    'ctl00$BodyContent$ddLicenseType': 'ALL',
    'ctl00$BodyContent$tbCity': '',
    'ctl00$BodyContent$tbZIP': '',
    'ctl00$BodyContent$ddBACategory': 'ALL',
    'ctl00$BodyContent$tbBADate': '',
    'ctl00$BodyContent$tbBADateRangeEnd': '',
    'ctl00$BodyContent$btnSearch': 'Search'
  };

  const params = new URLSearchParams(data).toString();

  const options = {
    hostname: 'profile.tmb.state.tx.us',
    path: '/Search.aspx?' + query,
    method: 'POST',
    headers: {
      Authority: 'profile.tmb.state.tx.us',
      Method: 'POST',
      Path: '/Search.aspx?' + query,
      Scheme: 'https',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'max-age=0',
      'Content-Length': Buffer.byteLength(params),
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: 'ASP.NET_SessionId=' + sessionid,
      Origin: 'https://profile.tmb.state.tx.us',
      Referer: 'https://profile.tmb.state.tx.us/Search.aspx?' + query,
      'Sec-Ch-Ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    },
  };

  const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);

    if (res.statusCode === 302) {
      setTimeout(() => {
        function4(sessionid, query);
      }, 1000);
    } else {
      console.log("something went wrong");
    }

    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      // console.log(`Response data: ${responseData}`);
    });
  });

  req.on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });

  req.write(params);

  req.end();
}

const function2 = (sessionid) => {
  const data = {
    __LASTFOCUS: '',
    __EVENTTARGET: '',
    __EVENTARGUMENT: '',
    __VIEWSTATE: '/wEPDwUKLTI5NTY5MDQ1MQ9kFgJmD2QWAgIDD2QWBAIJD2QWAgIBDw8WAh4EVGV4dAUUU3VuZGF5LCAwNyBKdWx5IDIwMjRkZAILD2QWBAIBDw8WAh8ABSh2Mi4wLjAuNSBDb3B5cmlnaHTCqSBUZXhhcyBNZWRpY2FsIEJvYXJkZGQCAw8PFgIfAAUdLSBDaHJvbWUgOTMgIElQOjE2MS43Ny41My4yMTFkZGQU/yBcD98gWmjoc8GulqBclqdVgw==',
    __VIEWSTATEGENERATOR: '16E88CAC',
    __SCROLLPOSITIONX: '0',
    __SCROLLPOSITIONY: '0',
    __EVENTVALIDATION: '/wEdAAOWJ0bFJKhBCTVIGzlBY09Ehyyo1Yyn/QW5AH28caHT5hwDCQcBoyys9Q8iVvvWAzUubKndNixZWalyCTcHs/X+U+jAiQ==',
    'ctl00$hfWindowID': '',
    'ctl00$BodyContent$btnAccept': 'I Accept the Usage Terms'
  };

  const params = new URLSearchParams(data).toString();

  const options = {
    hostname: 'profile.tmb.state.tx.us',
    path: '/SearchNotice.aspx',
    method: 'POST',
    headers: {
      Authority: 'profile.tmb.state.tx.us',
      Method: 'POST',
      Path: '/SearchNotice.aspx',
      Scheme: 'https',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'max-age=0',
      // 'Content-Length': '605',
      'Content-Length': Buffer.byteLength(params),
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: 'ASP.NET_SessionId=' + sessionid,
      Origin: 'https://profile.tmb.state.tx.us',
      Referer: 'https://profile.tmb.state.tx.us/Search.aspx',
      'Sec-Ch-Ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    },
  };

  const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);

    if (res.statusCode === 302) {
      const url = res.headers['location'];
      const value = url.substring(url.indexOf("?"));
      console.log(value);
      if (value) {
        setTimeout(() => {
          function3(sessionid, value);
        }, 1000);
      } else {
        console.log("parameter not found");
      }
    }

    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      // console.log(`Response data: ${responseData}`);
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
    hostname: 'profile.tmb.state.tx.us',
    path: '/Search.aspx',
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
      const sessionIdRegex = /ASP.NET_SessionId=([^;]+)/;
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