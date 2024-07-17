const { JSDOM } = require("jsdom");

const text = `
<hr />\n        <h4>\n            MARGARET KATHRYN LANGLEY            - PT        </h4>\n        <ul>\n            <li>License Number: <strong>1023596</strong></li>\n            <li>License Type: <strong>Physical Therapist - Regular License</strong></li>\n            <!--\n            <li>Address of Record: <strong>CROSSROADS, TX 76227</strong></li>\n            -->\n            <li>Issued on: <strong>09/01/1979</strong></li>\n            <li>Licensure Status: <strong>CURRENT - 10/31/2024</strong></li>\n            <li>Last Disciplinary Action:\n                                                    <strong>NONE</strong>\n                            </li>\n        </ul>        \n                    <hr />\n        <h4>\n            MARGARET OLSON BUSS            - PT        </h4>\n        <ul>\n            <li>License Number: <strong>1022564</strong></li>\n            <li>License Type: <strong>Physical Therapist - Regular License</strong></li>\n            <!--\n            <li>Address of Record: <strong>PASADENA, MA 21122</strong></li>\n            -->\n            <li>Issued on: <strong>06/01/1979</strong></li>\n            <li>Licensure Status: <strong>EXPIRED - 06/30/1991</strong></li>\n            <li>Last Disciplinary Action:\n                                                    <strong>NONE</strong>\n                            </li>\n        </ul>        \n                    <hr />\n        <h4>\n            MARGARET R FAUST            - PT        </h4>\n        <ul>\n            <li>License Number: <strong>1016871</strong></li>\n            <li>License Type: <strong>Physical Therapist - Regular License</strong></li>\n            <!--\n            <li>Address of Record: <strong>HOUSTON, TX 77096</strong></li>\n            -->\n            <li>Issued on: <strong>01/01/1977</strong></li>\n            <li>Licensure Status: <strong>EXPIRED - 01/31/1981</strong></li>\n            <li>Last Disciplinary Action:\n                                                    <strong>NONE</strong>\n                            </li>\n        </ul>
`;

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

const result = extractDetails(text);
console.log(JSON.stringify(result, null, 2));
