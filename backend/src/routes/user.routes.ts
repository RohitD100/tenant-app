import { Router } from "express";
import * as userController from "../controllers/user.controller";
import auth from "../middleware/auth";
import { authorize } from "../middleware/permission";

const router = Router();

router.use(auth);

router.post("/", authorize("CREATE_USER"), userController.createUser);
router.get("/", authorize("READ_USER"), userController.getUsers);
router.put("/:id", authorize("UPDATE_USER"), userController.updateUser);
router.patch(
  "/:id/deactivate",
  authorize("UPDATE_USER"),
  userController.deactivateUser,
);

export default router;
