//  https://emr.dads.state.tx.us/DadsEMRWeb/emrRegistrySearch.jsp
//  https://emr.dads.state.tx.us/DadsEMRWeb/searchResultsName.jsp
//  https://emr.dads.state.tx.us/DadsEMRWeb/searchResultsSsn.jsp

const https = require("https");
const { JSDOM } = require("jsdom");

const firstName = "Margaret";
const lastName = "Bell";

const postData = `firstName=${encodeURIComponent(
  firstName
)}&lastName=${encodeURIComponent(lastName)}`;
// const postData = `ssn=${encodeURIComponent(ssn)}`;

const options = {
  hostname: "emr.dads.state.tx.us",
  path: "/DadsEMRWeb/searchResultsName.jsp",
  // path: '/DadsEMRWeb/searchResultsSsn.jsp',
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": Buffer.byteLength(postData),
  },
};

const req = https.request(options, (res) => {
  console.log(`Status code: ${res.statusCode}`);

  let responseData = "";

  res.on("data", (chunk) => {
    responseData += chunk;
  });

  //  <h3>Records Found</h3>
  //  <h3>Records Not Found</h3>
  res.on("end", () => {
    console.log(
      `Response data True: ${responseData.includes(
        "<h3>Records Not Found</h3>"
      )}`
    );
    const dom = new JSDOM(responseData);
    const document = dom.window.document;
    const table = document.getElementById("searchResults");
    let result = [];
    if (table) {
      const keys = [
        "Last SSN",
        "Full Name",
        "Unemployable?",
        "NAR Status",
        "Certification Expiration Date",
        "NAR: Active, Unemployable",
        "NAR: Facility Type where Active Unemployable",
        "MAR Status",
        "Permit Expiration Date",
        "MAR: Active, Unemployable",
        "MAR: Facility Type where Active Unemployable",
        "Listed on the EMR",
        "Registry Enter Date",
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
    console.log(result);
  });
});

req.on("error", (error) => {
  console.error(`Error: ${error.message}`);
});

req.write(postData);
req.end();
