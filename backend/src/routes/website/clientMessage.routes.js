const express = require("express");
const route = express.Router();
const clientMessageController = require("../../controllers/website/clientMessage.controller");

module.exports = (app) => {
    route.post("/add", clientMessageController.create);



    app.use("/api/website/clientMessage", route);
};
//http://localhost:5000/api/website/clientMessage/add

