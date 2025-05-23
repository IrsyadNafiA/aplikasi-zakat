import { Router } from "express";
import {
  createZakat,
  deleteRemark,
  deleteZakat,
  getAllRemarks,
  getMyRemarks,
  getZakatByRemarkId,
  updateRemarkStatus,
  updateZakat,
} from "../controllers/zakat.controller.js";
import { auth } from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";

const routes = Router();

// Zakat
routes.post("/api/zakat", auth, createZakat);
routes.put("/api/zakat", auth, updateZakat);
routes.delete("/api/zakat", auth, deleteZakat);

// Remark
routes.get("/api/zakat/remarks", auth, isAdmin, getAllRemarks);
routes.get("/api/zakat/my-remarks", auth, getMyRemarks);
routes.put("/api/zakat/remark", auth, updateRemarkStatus);
routes.delete("/api/zakat/remark", auth, deleteRemark);

// Route dinamis
routes.get("/api/zakat/:id", auth, getZakatByRemarkId);

export default routes;
