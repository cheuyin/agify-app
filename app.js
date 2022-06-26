const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
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
  const reqURL = `https://api.agify.io?name=${name}&country_id=${countryCode}`;
  request(reqURL, (error, response, body) => {
    console.log(body);
  })
}

function displayData(apiData) {
}