//  https://ptot.texas.gov/pt-license-search/

const { JSDOM } = require("jsdom");
const https = require("https");
//  https://ptot.texas.gov/wp-json/ie/v1/search-therapists?license_number=1023596&type=pt
//  https://ptot.texas.gov/wp-json/ie/v1/search-therapists?last_name=ANN&dob=1996-01-05&type=pt

function extractDetails(text) {
  const dom = new JSDOM(text.replace(/\s{2,}/g, " ").trim());
  const document = dom.window.document;

  // Find all `<h4>` tags
  const h4Tags = document.querySelectorAll("h4");
  const details = [];

  // Loop through each <h4> tag to get details
  h4Tags.forEach((h4) => {
    const name = h4.textContent.trim();

    const ul = h4.nextElementSibling; // Assuming the <ul> immediately follows the <h4>

    if (ul && ul.tagName === "UL") {
      const licenseNumber = ul
        .querySelector("li:nth-of-type(1) strong")
        .textContent.trim();
      const licenseType = ul
        .querySelector("li:nth-of-type(2) strong")
        .textContent.trim();
      const issuedOn = ul
        .querySelector("li:nth-of-type(3) strong")
        .textContent.trim();
      const licensureStatus = ul
        .querySelector("li:nth-of-type(4) strong")
        .textContent.trim();
      const lastDisciplinaryAction = ul
        .querySelector("li:nth-of-type(5) strong")
        .textContent.trim();

      details.push({
        name,
        "License Number": licenseNumber,
        "License Type": licenseType,
        "Issued on": issuedOn,
        "Licensure Status": licensureStatus,
        "Last Disciplinary Action": lastDisciplinaryAction,
      });
    }
  });

  return details;
}

const options = {
  hostname: "ptot.texas.gov",
  path: "/wp-json/ie/v1/search-therapists?first_name=Margaret&last_name=&type=pt",
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
    const status = responseData.includes("No Result");
    let result = [];
    if (status) {
    } else {
      result = extractDetails(JSON.parse(responseData).html);
    }
    console.log({ status, result });
  });
});

req.on("error", (error) => {
  console.error(`Error: ${error.message}`);
});

req.end();
