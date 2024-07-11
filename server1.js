//  https://ptot.texas.gov/pt-license-search/

const https = require("https");
//  https://ptot.texas.gov/wp-json/ie/v1/search-therapists?license_number=1023596&type=pt
//  https://ptot.texas.gov/wp-json/ie/v1/search-therapists?last_name=ANN&dob=1996-01-05&type=pt

const options = {
  hostname: "ptot.texas.gov",
  path: "/wp-json/ie/v1/search-therapists?first_name=&last_name=Margaret&type=pt",
  method: "GET",
};

const req = https.request(options, (res) => {
  console.log(`Status code: ${res.statusCode}`);

  let responseData = "";

  res.on("data", (chunk) => {
    responseData += chunk;
  });

  res.on("end", () => {
    console.log(`Response data True: ${responseData.includes("No Result")}`);
  });
});

req.on("error", (error) => {
  console.error(`Error: ${error.message}`);
});

req.end();
