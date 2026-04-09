import { Router } from "express";
import * as roleController from "../controllers/role.controller";
import auth from "../middleware/auth";

const router = Router();

router.use(auth); // protect all

router.post("/", roleController.createRole);
router.get("/", roleController.getRoles);
router.put("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);

export default router;
