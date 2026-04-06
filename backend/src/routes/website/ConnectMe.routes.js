const express = require("express");
const route = express.Router();
const ConnectMeController = require("../../controllers/website/ConnectMe.controller");

module.exports = (app) => {
    route.post("/view", ConnectMeController.view);


    app.use("/api/backend/ConnectMe", route);
};
//http://localhost:5000/api/backend/ConnectMe/view
