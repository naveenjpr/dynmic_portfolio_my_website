const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const adminModel = require("./src/models/AdminModel.Schema");
require("dotenv").config();

const server = express();
server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use('/uploads/images', express.static('uploads/images'));

server.get("/", (request, response) => {
  response.send("Server Working Fine.....");
});

// server.get("*", (request, response) => {
//   response.send("Page not found.....");
// });

//admin 
require("./src/routes/admin/portfolio.routes")(server);
require("./src/routes/admin/Resume.routes")(server);
require("./src/routes/admin/adminAuth.routes")(server);
require("./src/routes/admin/category.routes")(server);
require("./src/routes/admin/Skills.routes")(server);
require("./src/routes/admin/Achievements.routes")(server);
require("./src/routes/admin/clientMessage.routes")(server);
require("./src/routes/admin/ConnectMe.routes")(server);
require("./src/routes/admin/SociallyEngaged.routes")(server);
//website
require("./src/routes/website/Skills.routes")(server);
require("./src/routes/website/Achievements.routes")(server);
require("./src/routes/website/portfolio.routes")(server);
require("./src/routes/website/clientMessage.routes")(server);
require("./src/routes/website/ConnectMe.routes")(server);
require("./src/routes/website/SociallyEngaged.routes")(server);


mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    const checkAdmin = await adminModel.find();
    if (checkAdmin.length == 0) {
      let admin = await adminModel({
        adminName: "admin",
        adminPassword: "admin123",
      });
      await admin.save();
    }
    server.listen(process.env.PORT, () => {
      console.log(
        `Database Connected and Server running on port ${process.env.PORT}`,
      );
    });
  })
  .catch((error) => {
    console.log("Database Not Connected!" + error);
  });
