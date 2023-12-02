import Contact from "../models/Contacts.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

async function getAll(req, res) {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.status(200).json(result);
}

async function getById(req, res) {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contacts with id=${contactId} not found`);
  }
  res.status(200).json(result);
}

async function add(req, res) {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
}

async function updateById(req, res) {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contacts with id=${contactId} not found`);
  }
  res.status(200).json(result);
}

async function deleteById(req, res, next) {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contacts with id=${contactId} not found`);
  }
  res.status(200).json({ message: "Contact deleted" });
}

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw HttpError(404, `Contacts with id=${contactId} not found`);
  }
  res.status(200).json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
