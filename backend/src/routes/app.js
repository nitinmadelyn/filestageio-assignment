/* eslint-disable no-console */
const express = require("express");
const config = require("../config/config");
//const database = require("../config/database");
const app = express();
const utilities = require("../utilities/utilities");
const superagent = require("superagent");
app.use(utilities.requestLogger);
app.use(require("cors")());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  process.on("uncaughtException", function (err) {
    console.log(err);
    superagent
    .post(config.apiEndPoint+'log')
    .send({"error": err}) 
    .set('backend-log', 'backend')
    .set('accept', 'json')
    .end((err, res) => {
      console.log("Log added success.")
    });
  });
  next();
});

const todos = require("./todos");
app.use("/todo", todos);

const logs = require("./logs");
app.use("/log", logs);

module.exports = app;
