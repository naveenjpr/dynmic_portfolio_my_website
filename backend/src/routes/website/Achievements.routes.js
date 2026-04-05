const express = require("express");
const route = express.Router();
const AchievementsController = require("../../controllers/website/Achievements.controller");



module.exports = (app) => {
    route.post("/view", AchievementsController.view);


    app.use("/api/website/Achievements", route);
};
//http://localhost:5000/api/website/Achievements/view

