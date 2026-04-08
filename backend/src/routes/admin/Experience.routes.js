const express = require("express");
const route = express.Router();
const ExperienceController = require("../../controllers/admin/Experience.controller");
const upload = require("../../config/upload");

module.exports = (app) => {
    route.post("/add", upload.single("companyLogo"), ExperienceController.create);
    route.post("/view", ExperienceController.view);
    route.post("/status-change", ExperienceController.statusChange);
    route.post("/detail/:id", ExperienceController.detail);
    route.put("/update/:id", upload.single("companyLogo"), ExperienceController.update);
    route.delete("/delete/:id", ExperienceController.delete);

    app.use("/api/backend/Experience", route);
};
//http://localhost:5000/api/backend/Experience/add
//http://localhost:5000/api/backend/Experience/view
//http://localhost:5000/api/backend/Experience/status-change
//http://localhost:5000/api/backend/Experience/detail/:id
//http://localhost:5000/api/backend/Experience/update
//http://localhost:5000/api/backend/Experience/delete/:id
