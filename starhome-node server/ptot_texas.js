//  https://ptot.texas.gov/pt-license-search/

const https = require("https");
//  https://ptot.texas.gov/wp-json/ie/v1/search-therapists?license_number=1023596&type=pt
//  https://ptot.texas.gov/wp-json/ie/v1/search-therapists?last_name=ANN&dob=1996-01-05&type=pt

const ptot_texas_api = async (first, last) => {
  const options = {
    hostname: "ptot.texas.gov",
    path: `/wp-json/ie/v1/search-therapists?first_name=${first}&last_name=${last}&type=pt`,
    method: "GET",
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`Status code: ${res.statusCode}`);

      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        const status = responseData.includes("No Result");
        resolve(status);
      });
    });

    req.on("error", (error) => {
      console.error(`Error: ${error.message}`);
    });

    req.end();
  });
};

module.exports = {
  ptot_texas_api,
};
