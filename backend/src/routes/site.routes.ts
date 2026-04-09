import { Router } from "express";
import * as siteController from "../controllers/site.controller";
import auth from "../middleware/auth";
import { authorize } from "../middleware/permission";

const router = Router();

router.use(auth);

router.post("/", authorize("CREATE_SITE"), siteController.createSite);
router.get("/", authorize("READ_SITE"), siteController.getSites);
router.put("/:id", authorize("UPDATE_SITE"), siteController.updateSite);
router.delete("/:id", authorize("DELETE_SITE"), siteController.deleteSite);

export default router;
