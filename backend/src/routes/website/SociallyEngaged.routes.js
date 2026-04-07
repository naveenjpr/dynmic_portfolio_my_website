const express = require("express");
const route = express.Router();
const SocialController = require("../../controllers/website/SociallyEngaged.controller");

module.exports = (app) => {
  route.post("/view", SocialController.view);

  app.use("/api/website/Social", route);
};
//http://localhost:5000/api/website/Social/view
