const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

let nameQuery = "";
let ageGuess = "";
let numOfDataPoints = "";

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  renderMainPage(res);
})

app.post("/", (req, res) => {
  const formData = req.body;
  getAPIData(formData)
    .then(data => {
      displayData(data);
      renderMainPage(res);
    })
    .catch(error => {
      const fullError = error.toJSON();
      showErrorPage(res, fullError.status, fullError.message);
    })
  })

app.listen(port, () => {
  console.log("Server running on port " + port);
});

function getAPIData(formData) {
  const name = formData.name;
  const countryCode = formData.country_code;
  const reqURL = `https://api.agify.io?name=${name}` +
    ((countryCode === "all") ? "" : `&country_id=${countryCode}`);
  return axios
    .get(reqURL);
}

function displayData(apiData) {
  nameQuery = apiData.data.name;
  ageGuess = apiData.data.age;
  numOfDataPoints = apiData.data.count
}

function renderMainPage(res) {
  res.render("index", {nameQuery, ageGuess, numOfDataPoints});
}


function showErrorPage(res, errorCode, errorMessage) {
  res.render("failure", {errorCode, errorMessage});
}


