const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
  // getAPIData(req.body)
  //   .then(data => displayData(data));
  getAPIData(req.body);
})

app.listen(port, () => {
  console.log("Server running on port " + port);
});

function getAPIData(query) {
  const name = query.name;
  const countryCode = query.country_code;
  const reqURL = `https://api.agify.io?name=${name}` +  
  ((countryCode === "all") ? "" : `&country_id=${countryCode}`);
  axios
    .get(reqURL)
    .then(response => {
      console.log(response);
    })
}

function displayData(apiData) {
}