const express = require("express");
const route = express.Router();
const ExperienceController = require("../../controllers/website/Experience.controller");

module.exports = (app) => {
    route.post("/view", ExperienceController.view);

    app.use("/api/website/Experience", route);
};
//http://localhost:5000/api/website/Experience/view

