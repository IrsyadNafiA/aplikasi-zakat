import express from "express";
import { configDotenv } from "dotenv";
import userRoutes from "./routes/user.routes.js";

configDotenv();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routing
app.use(userRoutes);

export default app;
