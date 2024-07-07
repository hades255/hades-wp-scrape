const https = require('https');

const options = {
  hostname: 'profile.tmb.state.tx.us',
  path: '/SearchResults.aspx?64678486-569c-44c7-9962-7608d43c93e1',
  method: 'GET',
  headers: {
    Cookie: 'ASP.NET_SessionId=tdtjknbuues2hhm11mrcg45c',
  },
};

const req = https.request(options, (res) => {
  console.log(`Status code: ${res.statusCode}`);

  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log(`Response data: ${responseData}`);
  });
});

req.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

req.end();
