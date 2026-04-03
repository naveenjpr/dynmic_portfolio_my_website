const express = require("express");
const route = express.Router();
const categoryController = require("../../controllers/admin/category.controller");

module.exports = (app) => {
    route.post("/add", categoryController.create);
    route.post("/view", categoryController.view);
    route.post("/status-change", categoryController.statusChange);
    route.post("/detail/:id", categoryController.detail);
    route.put("/update/:id", categoryController.update);
    route.delete("/delete/:id", categoryController.delete);

    app.use("/api/backend/category", route);
};
//http://localhost:5000/api/backend/category/add
//http://localhost:5000/api/backend/category/view
//http://localhost:5000/api/backend/category/status-change
//http://localhost:5000/api/backend/category/detail/:id
//http://localhost:5000/api/backend/category/update
//http://localhost:5000/api/backend/category/delete/:id
