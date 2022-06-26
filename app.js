const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
  getAPIData(req.body)
    .then(data => displayData(data));
})

app.listen(port, () => {
  console.log("Server running on port " + port);
});

function getAPIData(query) {
  const name = query.name;
  const countryCode = query.country_code;
  const reqURL = `https://api.agify.io?name=${name}` +
    ((countryCode === "all") ? "" : `&country_id=${countryCode}`);
  return axios
    .get(reqURL)
    .catch(error => {
      console.log(error)
    })
}

function displayData(apiData) {
  if (apiData.statusCode !== "200") {
    showErrorPage(apiData);
  }
}


function showErrorPage(apiData) {
  console.log("Error!");
}

// TODO: ENABLE WRITING CONTENT TO HTML VIA JS

