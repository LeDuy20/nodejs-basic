const express = require("express");
const path = require("path");

const viewEngine = (app) => {
  //config template engine
  app.set("views", path.join('./src', "views"));
  app.set("view engine", "ejs");
  //config static file
  app.use(express.static(path.join('./src', "public")));
};

module.exports = viewEngine;
