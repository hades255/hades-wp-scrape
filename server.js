const https = require('https');

const firstName = 'Margaret';
const lastName = '';

const postData = `firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`;

const options = {
    hostname: 'emr.dads.state.tx.us',
    path: '/DadsEMRWeb/searchResultsName.jsp',
    method: 'POST',
    headers: {
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

    //  <h3>Records Found</h3>
    //  <h3>Records Not Found</h3>
    res.on('end', () => {
        console.log(`Response data True: ${responseData.includes('<h3>Records Not Found</h3>')}`);
        console.log(`Response data False: ${responseData.includes('<h3>Records Found</h3>')}`);
    });
});

req.on('error', (error) => {
    console.error(`Error: ${error.message}`);
});

req.write(postData);
req.end();
