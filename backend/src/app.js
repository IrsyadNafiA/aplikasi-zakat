import express from "express";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
