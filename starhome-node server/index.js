const express = require("express");
const app = express();

// const { ptot_texas_api } = require("./ptot_texas");
// const { emr_dads_api } = require("./emr_dads");
// const { profile_tmb_api } = require("./profile_tmb");
const { exclusions_oig_api } = require("./exclusions_oig");
const { oig_hhsc_api } = require("./oig_hhsc");

app.use(express.static("public"));

app.get("/", (req, res) => {
  return res.sendFile("/index.html");
});

// /**
//  * https://ptot.texas.gov/pt-license-search/
//  */
// app.get("/ptot-texas", async (req, res) => {
//     try {
//         const { first, last } = req.query;
//         const value = await ptot_texas_api(first, last);
//         return res.status(200).json({ score: value });
//     } catch (e) {
//         return res.status(500).json({ error: e.message });
//         console.log(e.message);
//     }
// });

// /**
//  * https://emr.dads.state.tx.us/DadsEMRWeb/searchResultsName.jsp
//  */
// app.get("/emr-dads", async (req, res) => {
//     try {
//         const { first, last } = req.query;
//         const value = await emr_dads_api(first, last);
//         return res.status(200).json({ score: value });
//     } catch (e) {
//         console.log(e.message);
//         return res.status(500).json({ error: e.message });
//     }
// });

// /**
//  * https://profile.tmb.state.tx.us/Search.aspx
//  */
// app.get("/profile-tmb", async (req, res) => {
//     try {
//         const { first, last } = req.query;
//         const value = await profile_tmb_api(first, last);
//         return res.status(200).json({ score: value });
//     } catch (e) {
//         console.log(e.message);
//         return res.status(500).json({ error: e.message });
//     }
// });

/**
 * https://exclusions.oig.hhs.gov
 */
app.get("/exclusions-oig", async (req, res) => {
  try {
    const { first, last } = req.query;
    const result = await exclusions_oig_api(first, last);
    return res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: e.message });
  }
});

/**
 * https://oig.hhsc.state.tx.us/oigportal2/Exclusions
 */
app.get("/oig-hhsc", async (req, res) => {
  try {
    const { first, last } = req.query;
    const result = await oig_hhsc_api(first, last);
    return res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: e.message });
  }
});

const server = app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

server.setTimeout(8000);
