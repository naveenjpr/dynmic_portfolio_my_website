const express = require("express");
const route = express.Router();
const skillsController = require("../../controllers/admin/Skills.controller");
const upload = require("../../config/upload");
module.exports = (app) => {
    route.post("/parent-category", skillsController.parentcategory);
    route.post("/add", upload.single("SkillsIcon"), skillsController.create);
    route.post("/view", skillsController.view);
    route.post("/status-change", skillsController.statusChange);
    route.post("/detail/:id", skillsController.detail);
    route.put("/update/:id", upload.single("SkillsIcon"), skillsController.update);
    route.delete("/delete/:id", skillsController.delete);

    app.use("/api/backend/skills", route);
};
//http://localhost:5000/api/backend/skills/parent-category
//http://localhost:5000/api/backend/skills/add
//http://localhost:5000/api/backend/skills/view
//http://localhost:5000/api/backend/skills/status-change
//http://localhost:5000/api/backend/skills/detail/:id
//http://localhost:5000/api/backend/skills/update
//http://localhost:5000/api/backend/skills/delete/:id
