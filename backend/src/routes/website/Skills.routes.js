const express = require("express");
const route = express.Router();
const skillsController = require("../../controllers/website/Skills.controller");
module.exports = (app) => {
    route.post("/view", skillsController.view);


    app.use("/api/website/skills", route);
};

//http://localhost:5000/api/website/skills/view
