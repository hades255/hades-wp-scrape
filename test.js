const https = require('https');

const function2 = (AWSALBMatch) => {
    const options = {
        hostname: 'exclusions.oig.hhs.gov',
        path: '/SearchResults.aspx',
        method: 'GET',
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "max-age=0",
            "Cookie": `AspxAutoDetectCookieSupport=1; ASP.NET_SessionId=4gfu4g05vl2wafy05nt2dde3; _ga=GA1.1.1236123585.1720565171; _ga_8RZ83J1052=GS1.1.1720565284.1.0.1720565284.60.0.0; AWSALB=${AWSALBMatch}; AWSALBCORS=${AWSALBMatch}; _ga_3YLR8EGLBW=GS1.1.1720565170.1.1.1720566208.53.0.0; _ga_CSLL4ZEK4L=GS1.1.1720565170.4.1.1720566208.0.0.0`,
            "Priority": "u=0, i",
            "Referer": "https://exclusions.oig.hhs.gov/?AspxAutoDetectCookieSupport=1",
            "Sec-Ch-Ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": "\"Windows\"",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
        }
    };

    const req = https.request(options, (res) => {
        console.log(`Status code: ${res.statusCode}`);

        let responseData = '';

        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            console.log(res.headers)
            console.log(responseData);
            console.log(`Response data True: ${responseData.includes('No Results were found for')}`);
        });
    });

    req.on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });

    req.end();
}

const function1 = () => {
    const data = {
        "__EVENTTARGET": "",
        "__EVENTARGUMENT": "",
        "__VIEWSTATE": "ahP+o7NNHG4Oh28J6iDTi8p3Qxz4o71mjX84VkoILW2iyaGb33EuUh9OrNwJg+VqwybTsq6gZAIuy9aGPh//cytG//2M1ueF/gLEReUzZ9Is7YVXheHVE3ew2Ll94BpSe6ENpE7JMONDPiVsW+lDCN/RLhKlA+I+6b30+aHU0jsw70W1owP3e+1sDYPAgQp6vESGeIDO9SyqkIOfkmXfzdUkEkmHAgNXjR0BL0nX/dBXXh3Zw/OBAschkG3yWIBQVa86a2HvqBAd186/U0HYSXfyYrnWFUw6wieTB5PaYM7FrUHeH4eU1EiI6Gt3XQvagy9kNxCcw92ExIOKaKohfemrnUzoZ9xNps7O9kfbS2Y9vgi/Othj31rKc5tUChlhmgNZYQDRC9xXRTtQ3O4LnOLSRiR8kTL9XEJ/veP1C5iRT843bb7X7F6gB2rwjq06B+HRbk04Ih4Ndaw3QlNeKfFZKZzaCuPbv7ThYQK5jidYKcgVIjzjFKSfV5AXCK+WBKn9zncErM9aqKRo/RCP5quVH34qboHDiUrUar7PRvBm7q/W88yZNxASunJczbtA+uRU3ubfjW/46RilrdiKiYxlcdlAScqm9OfDNQknqFu4ON+DlCbGtK7kPpv+kFwRW28OXQ0eMg7hmoCVjwQt/QxXQDDioiOYbqHxfI80p/NZR08qG+3UhEWEjneiGY6/D8fPiQ==",
        "__VIEWSTATEGENERATOR": "CA0B0334",
        "__SCROLLPOSITIONX": "0",
        "__SCROLLPOSITIONY": "200",
        "__EVENTVALIDATION": "Vv0HCTU14zGPYm5W9Z4d8+MITGOw+l105yXPSYTsfsEKt0Ob3ztEIStDnNu3QayUqGQ9WCO3J5A6/n3RsrJACzziq/PwEcBW54BEAoMKHlZSZS1XOc4MgGcOY9jozcPf+e5dZ+rklT5AiZ8EFNaL2CE4qOXtD1AGWLhVxIOxyrumP5PURn+WSTCrP0x+FhKjR++eSsNgjlu0/+M6ZRZlc95vIrWm0CTB++AjeaYpUeXX3GWEBMETSGqp087D3LF1K/Yy09XHRIDaEiXlhlBdxHjblB+jsktZb3g0uVYXqA5Gng0N",
        "ctl00$cpExclusions$txtSPLastName": "Margaret",
        "ctl00$cpExclusions$txtSPFirstName": "",
        "ctl00$cpExclusions$ibSearchSP.x": "51",
        "ctl00$cpExclusions$ibSearchSP.y": "10"
    };

    const postData = new URLSearchParams(data).toString();

    const options = {
        hostname: 'exclusions.oig.hhs.gov',
        path: '/?AspxAutoDetectCookieSupport=1',
        method: 'POST',
        headers: {
            // ":authority": "exclusions.oig.hhs.gov",
            // ":method": "POST",
            // ":path": "/?AspxAutoDetectCookieSupport=1",
            // ":scheme": "https",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "max-age=0",
            "Cookie": "AspxAutoDetectCookieSupport=1; AWSALB=k0u2vHAdurEMpzxKMFMLnBd4HteHg+mjuDdo5lfQPu71tokrrDeq0glNtMeB3+eE74hKQBIuj7ZAi+Wmyzm/03m78t7QE2sS4bEAYrwEmTqrkFYCb3a35dVKT28v; AWSALBCORS=k0u2vHAdurEMpzxKMFMLnBd4HteHg+mjuDdo5lfQPu71tokrrDeq0glNtMeB3+eE74hKQBIuj7ZAi+Wmyzm/03m78t7QE2sS4bEAYrwEmTqrkFYCb3a35dVKT28v; ASP.NET_SessionId=4gfu4g05vl2wafy05nt2dde3; _ga=GA1.1.1236123585.1720565171; _ga_CSLL4ZEK4L=GS1.1.1720565170.4.1.1720565170.0.0.0; _ga_3YLR8EGLBW=GS1.1.1720565170.1.1.1720565284.60.0.0",
            "Origin": "https://exclusions.oig.hhs.gov",
            "Priority": "u=0, i",
            "Referer": "https://exclusions.oig.hhs.gov/?AspxAutoDetectCookieSupport=1",
            "Sec-Ch-Ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": "\"Windows\"",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
            'Content-Type': 'application/x-www-form-urlencoded',
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
            const setCookieHeader = res.headers['set-cookie'].toString();
            const AWSALBRegex = /AWSALB=([^;]+)/;
            const AWSALBMatch = setCookieHeader.match(AWSALBRegex)[1];
            console.log(AWSALBMatch);
            function2(AWSALBMatch);
            // console.log(responseData);
            // console.log(`Response data True: ${responseData.includes('No Results were found for')}`);
        });
    });

    req.on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });

    req.write(postData);
    req.end();
}

function1()
// function2("u5ZdJYTsYBDKO6RBxA3fkLMrt0n7ltxpA48jDyNi7K35ydZQwAlIc61Vztp8CGmprasJVqNYW7HnMRUZ10O27GBqY3e/7LugQPSoeQ5pTbj+SaOmegzhNsZUEuPW");