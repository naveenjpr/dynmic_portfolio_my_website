const express = require("express");
const route = express.Router();
const ResumeController = require("../../controllers/backend/Resume.controller");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.single("image"), ResumeController.create);
  route.post("/view", ResumeController.view);
  route.post("/status-change", ResumeController.statusChange);
  route.post("/detail/:id", ResumeController.detail);
  route.put("/update/:id", upload.single("image"), ResumeController.update);
  route.delete("/delete/:id", ResumeController.delete);

  app.use("/api/backend/Resume", route);
};
//http://localhost:5000/api/backend/Resume/add
//http://localhost:5000/api/backend/Resume/view
//http://localhost:5000/api/backend/Resume/status-change
//http://localhost:5000/api/backend/Resume/detail/:id
//http://localhost:5000/api/backend/Resume/update
//http://localhost:5000/api/backend/Resume/delete/:id
