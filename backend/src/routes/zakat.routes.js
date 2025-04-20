import { Router } from "express";
import {
  createZakat,
  deleteZakat,
  updateZakat,
} from "../controllers/zakat.controller.js";
import { auth } from "../middlewares/auth.js";

const routes = Router();

routes.post("/api/zakat", auth, createZakat);
routes.put("/api/zakat", auth, updateZakat);
routes.delete("/api/zakat", auth, deleteZakat);

export default routes;
