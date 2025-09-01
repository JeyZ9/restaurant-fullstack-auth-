// const express = require('express');
import express from "express";
// const dotenv = require("dotenv")
import dotenv from "dotenv";
import cors from "cors";
import restaurantRouter from "./routers/restaurant.router.js";
import authRouter from "./routers/auth.router.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const FRONT_END_URL = process.env.FRONT_END_URL;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import db from "./models/index.js";
// const role = db.role;
// const initRole = () => {
//   Role.create({ id: 1, roleName: "user" });
//   Role.create({ id: 2, roleName: "moderator" });
//   Role.create({ id: 3, roleName: "admin" });
// }
// db.sequelize.sync({ force: ture }).then(() => {
//   initRole();
// })

db.sequelize.sync({ force: false }).then(() => {
  console.log("create table user_roles");
});

app.get("/", (req, res) => {
  res.send("Hello Nodemon 555");
});

app.use(
  cors({
    oring: ["http://localhost:5173", "127.0.0.1:5173", FRONT_END_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Athorization", "x-access-token"],
  })
);

// use restaurant router
app.use("/api/v1/restaurants", restaurantRouter);

// use authentication router
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
