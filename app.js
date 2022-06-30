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
  res.render("index", {nameQuery, ageGuess, numOfDataPoints});
})

app.post("/", (req, res) => {
  const formData = req.body;
  getAPIData(formData)
    .then(data => {
      displayData(data);
      res.redirect("/");
    });
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
    .get(reqURL)
    .catch(error => {
      console.log(error)
    })
}

function displayData(apiData) {
  nameQuery = apiData.data.name;
  ageGuess = apiData.data.age;
  numOfDataPoints = apiData.data.count
}


function showErrorPage(apiData) {
  console.log("Error!");
}


