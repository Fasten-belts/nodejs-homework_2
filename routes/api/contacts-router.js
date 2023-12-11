import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { validateBody } from "../../decorators/index.js";

import {
  authenticate,
  isEmptyBody,
  isValidId,
  upload,
} from "../../middlewares/index.js";

import {
  contactAddSchema,
  contactFavoriteSchema,
  contactUpdateSchema,
} from "../../utils/validation/contactValidationSchemas.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.add
);

contactsRouter.delete("/:contactId", isValidId, contactsController.deleteById);

contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsController.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactFavoriteSchema),
  contactsController.updateById
);

export default contactsRouter;
