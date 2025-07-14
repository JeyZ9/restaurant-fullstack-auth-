// const express = require('express');
import express, { urlencoded } from "express";
// const dotenv = require("dotenv")
import dotenv from "dotenv";
dotenv.config()

const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello Nodemon 555')
})

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
})