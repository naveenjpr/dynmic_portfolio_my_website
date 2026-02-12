const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
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
require("./src/routes/backend/portfolio.routes")(server);
require("./src/routes/backend/Resume.routes")(server);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(
        `Database Connected and Server running on port ${process.env.PORT}`,
      );
    });
  })
  .catch((error) => {
    console.log("Database Not Connected!" + error);
  });
