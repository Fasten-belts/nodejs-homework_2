import express from "express";

import authController from "../../controllers/auth-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { authenticate } from "../../middlewares/index.js";
import {
  userLoginSchema,
  userRegisterSchema,
  userSubscriptionSchema,
} from "../../utils/validation/userValidationSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userRegisterSchema),
  authController.register
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userLoginSchema),
  authController.login
);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch(
  "/subscription",
  authenticate,
  isEmptyBody,
  validateBody(userSubscriptionSchema),
  authController.subscription
);

export default authRouter;