//const dotenv = require("dotenv");
// const express = require("express");

import dotenv from "dotenv";
import express from "express";
//import router from "./Routes/auth";
import { readdirSync } from "fs";
import cors from "cors";
import mongoose from "mongoose";
const morgan = require("morgan");

const app = express();

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

dotenv.config({ path: "./.env.example" });

// db connection
const DB = process.env.MONGO_URI_DATABASE.replace(
  "PASSWORD",
  process.env.DB_PSWD
);
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Connection with DB  Successful`);
  })
  .catch((error) => {
    console.log(error);
  });

// Applying our Routes using middle wares

// Read all our Routes path files
readdirSync("./routes").map((files) =>
  app.use("/api", require(`./routes/${files}`))
);
//app.use("/api", router);

const Port = process.env.PORT || 8000;

app.listen(Port, () => {
  console.log(`Server Up and Running on Port ${Port}`);
});
