import { Router } from "express";
import { auth } from "../middlewares/auth.js";

//Controller
import {
  authMe,
  login,
  logout,
  refresh,
  register,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/api/auth/register", register);
router.post("/api/auth/login", login);
router.post("/api/auth/refresh", refresh);
router.post("/api/auth/logout", auth, logout);
router.get("/api/auth/me", auth, authMe);

export default router;
