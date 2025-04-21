import { Router } from "express";
import {
  createZakat,
  deleteZakat,
  updateRemarkStatus,
  updateZakat,
} from "../controllers/zakat.controller.js";
import { auth } from "../middlewares/auth.js";

const routes = Router();

// Zakat
routes.post("/api/zakat", auth, createZakat);
routes.put("/api/zakat", auth, updateZakat);
routes.delete("/api/zakat", auth, deleteZakat);

// Remark
routes.put("/api/zakat/remark", auth, updateRemarkStatus);
// routes.delete("/api/zakat/remark", auth, dele);

export default routes;
