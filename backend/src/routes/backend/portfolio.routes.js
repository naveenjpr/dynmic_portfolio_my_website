const express = require("express");
const route = express.Router();
const portfolioController = require("../../controllers/backend/portfolio.controller");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.single("image"), portfolioController.create);
  route.post("/view", portfolioController.view);
  route.post("/status-change", portfolioController.statusChange);
  route.post("/detail/:id", portfolioController.detail);
  route.put("/update/:id", upload.single("image"), portfolioController.update);
  route.delete("/delete/:id", portfolioController.delete);

  app.use("/api/backend/portfolio", route);
};
//http://localhost:5000/api/backend/portfolio/add
//http://localhost:5000/api/backend/portfolio/view
//http://localhost:5000/api/backend/portfolio/status-change
//http://localhost:5000/api/backend/portfolio/detail/:id
//http://localhost:5000/api/backend/portfolio/update
//http://localhost:5000/api/backend/portfolio/delete/:id
