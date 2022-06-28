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
  getAPIData(req.body)
    .then(data => displayData(data))
    .then(completion => res.redirect("/"));
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
  nameQuery = apiData.data.name;
  ageGuess = apiData.data.age;
  numOfDataPoints = apiData.data.count
}


function showErrorPage(apiData) {
  console.log("Error!");
}


