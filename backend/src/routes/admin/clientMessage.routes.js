const express = require("express");
const route = express.Router();
const clientMessageController = require("../../controllers/admin/clientMessage.controller");

module.exports = (app) => {
    route.post("/view", clientMessageController.view);

    app.use("/api/backend/clientMessage", route);
};
//http://localhost:5000/api/backend/clientMessage/view

