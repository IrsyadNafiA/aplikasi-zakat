import { Router } from "express";
import { auth } from "../middlewares/auth.js";

//Controller
import { login, logout, refresh } from "../controllers/auth.controller.js";
import { getUserById } from "../controllers/user.controller.js";

const router = Router();

router.post("/api/auth/login", login);
router.post("/api/auth/refresh", refresh);
router.post("/api/auth/logout", auth, logout);
router.get("/api/auth/me", auth, getUserById);

export default router;
