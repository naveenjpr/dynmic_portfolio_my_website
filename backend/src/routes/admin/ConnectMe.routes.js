const express = require("express");
const route = express.Router();
const ConnectMeController = require("../../controllers/admin/ConnectMe.controller");

module.exports = (app) => {
    route.post("/add", ConnectMeController.create);
    route.post("/view", ConnectMeController.view);
    route.post("/status-change", ConnectMeController.statusChange);
    route.post("/detail/:id", ConnectMeController.detail);
    route.put("/update/:id", ConnectMeController.update);
    route.delete("/delete/:id", ConnectMeController.delete);

    app.use("/api/backend/ConnectMe", route);
};
//http://localhost:5000/api/backend/ConnectMe/add
//http://localhost:5000/api/backend/ConnectMe/view
//http://localhost:5000/api/backend/ConnectMe/status-change
//http://localhost:5000/api/backend/ConnectMe/detail/:id
//http://localhost:5000/api/backend/ConnectMe/update
//http://localhost:5000/api/backend/ConnectMe/delete/:id
