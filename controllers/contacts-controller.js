import contactsService from "../models/contacts/index.js";
import { HttpError } from "../helpers/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../schemas/contact-schemas.js";

async function getAll(req, res, next) {
  try {
    const result = await contactsService.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contacts with id=${contactId} not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function add(req, res, next) {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function updateById(req, res, next) {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contacts with id=${contactId} not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteById(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contacts with id=${contactId} not found`);
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
}

export default {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
