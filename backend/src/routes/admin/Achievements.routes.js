const express = require("express");
const route = express.Router();
const AchievementsController = require("../../controllers/admin/Achievements.controller");
const upload = require("../../config/upload");



module.exports = (app) => {
    route.post("/add", upload.single("image"), AchievementsController.create);
    route.post("/view", AchievementsController.view);
    route.post("/status-change", AchievementsController.statusChange);
    route.post("/detail/:id", AchievementsController.detail);
    route.put("/update/:id", upload.single("image"), AchievementsController.update);
    route.delete("/delete/:id", AchievementsController.delete);

    app.use("/api/backend/Achievements", route);
};
//http://localhost:5000/api/backend/Achievements/add
//http://localhost:5000/api/backend/Achievements/view
//http://localhost:5000/api/backend/Achievements/status-change
//http://localhost:5000/api/backend/Achievements/detail/:id
//http://localhost:5000/api/backend/Achievements/update
//http://localhost:5000/api/backend/Achievements/delete/:id
