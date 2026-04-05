const express = require("express");
const route = express.Router();
const portfolioController = require("../../controllers/website/portfolio.controller");


module.exports = (app) => {
  route.post("/view", portfolioController.view);


  app.use("/api/website/portfolio", route);
};
//http://localhost:5000/api/website/portfolio/view

