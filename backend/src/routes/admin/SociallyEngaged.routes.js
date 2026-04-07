const express = require("express");
const route = express.Router();
const SocialController = require("../../controllers/admin/SociallyEngaged.controller");
const upload = require("../../config/upload");

module.exports = (app) => {
    route.post("/add", upload.single("social_icon"), SocialController.create);
    route.post("/view", SocialController.view);
    route.post("/status-change", upload.none(), SocialController.statusChange);
    route.post("/detail/:id", SocialController.detail);
    route.put("/update/:id", upload.single("social_icon"), SocialController.update);
    route.delete("/delete/:id", SocialController.delete);

    app.use("/api/backend/Social", route);
};
//http://localhost:5000/api/backend/Social/add
//http://localhost:5000/api/backend/Social/view
//http://localhost:5000/api/backend/Social/status-change
//http://localhost:5000/api/backend/Social/detail/:id
//http://localhost:5000/api/backend/Social/update
//http://localhost:5000/api/backend/Social/delete/:id
