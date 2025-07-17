// const express = require('express');
import express from "express";
// const dotenv = require("dotenv")
import dotenv from "dotenv";
import cors from "cors"
import restaurantRouter from "./routers/restaurant.router.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello Nodemon 555');
});

app.use(cors({
  oring: ["http://localhost:5173", "127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Athorization"]
}))

// use router
app.use("/api/v1/restaurants", restaurantRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});