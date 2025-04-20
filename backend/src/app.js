import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import zakatRoutes from "./routes/zakat.routes.js";

configDotenv();
const app = express();
const corsOrigin = JSON.parse(process.env.CORS);

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: corsOrigin,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routing
app.use(userRoutes);
app.use(authRoutes);
app.use(zakatRoutes);

export default app;
