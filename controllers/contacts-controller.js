
import Contact from "../models/Contacts.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

async function getAll(req, res) {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...filterParams } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner, ...filterParams };

  const result = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");

  const total = await Contact.countDocuments(filter);

  res.status(200).json(result, total);
}

async function getById(req, res) {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, `Contacts with id=${contactId} not found`);
  }
  res.status(200).json(result);
}

async function add(req, res) {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
}

async function updateById(req, res) {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body
  );
  if (!result) {
    throw HttpError(404, `Contacts with id=${contactId} not found`);
  }
  res.status(200).json(result);
}

async function deleteById(req, res, next) {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, `Contacts with id=${contactId} not found`);
  }
  res.status(200).json({ message: "Contact deleted" });
}

const updateFavorite = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body
  );
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
