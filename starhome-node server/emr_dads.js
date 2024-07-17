//  https://emr.dads.state.tx.us/DadsEMRWeb/searchResultsName.jsp

const https = require("https");
const { JSDOM } = require("jsdom");

const emr_dads_api = async (first, last) => {
  const postData = `firstName=${encodeURIComponent(
    first
  )}&lastName=${encodeURIComponent(last)}`;

  const options = {
    hostname: "emr.dads.state.tx.us",
    path: "/DadsEMRWeb/searchResultsName.jsp",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`Status code: ${res.statusCode}`);

      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      //  <h3>Records Found</h3>
      //  <h3>Records Not Found</h3>
      res.on("end", () => {
        const status = responseData.includes("<h3>Records Not Found</h3>");
        let result = [];
        if (!status) {
          const dom = new JSDOM(responseData);
          const document = dom.window.document;
          const table = document.getElementById("searchResults");
          if (table) {
            const keys = [
              "lastSSN",
              "fullName",
              "unemployable",
              "NARStatus",
              "certificationExpirationDate",
              "NAR:Active,Unemployable",
              "NAR:FacilityTypewhereActiveUnemployable",
              "MARStatus",
              "PermitExpirationDate",
              "MAR:Active,Unemployable",
              "MAR:FacilityTypewhereActiveUnemployable",
              "ListedontheEMR",
              "RegistryEnterDate",
            ];
            const trNodeList = table.querySelectorAll("tr");
            const trArray = Array.from(trNodeList).slice(1);
            trArray.forEach((tr) => {
              const tdList = tr.querySelectorAll("td");
              let trObject = {};
              const tdArray = Array.from(tdList);
              for (let i = 0; i < keys.length; i++) {
                trObject[keys[i]] = tdArray[i].textContent;
              }
              result.push(trObject);
            });
          }
        }
        resolve({ status, result });
      });
    });

    req.on("error", (error) => {
      console.error(`Error: ${error.message}`);
    });

    req.write(postData);
    req.end();
  });
};
const emr_dads_api_ssn = async (ssn, last) => {
  const postData = `ssn=${encodeURIComponent(ssn)}`;

  const options = {
    hostname: "emr.dads.state.tx.us",
    path: "/DadsEMRWeb/searchResultsSsn.jsp",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`Status code: ${res.statusCode}`);

      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      //  <h3>Records Found</h3>
      //  <h3>Records Not Found</h3>
      res.on("end", () => {
        const status = responseData.includes("<h3>Records Not Found</h3>");
        resolve(status);
      });
    });

    req.on("error", (error) => {
      console.error(`Error: ${error.message}`);
    });

    req.write(postData);
    req.end();
  });
};

module.exports = {
  emr_dads_api,
  emr_dads_api_ssn,
};
