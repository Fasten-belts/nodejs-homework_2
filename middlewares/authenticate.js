import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import User from "../models/User.js";

const { JWT_SECRET } = process.env;

async function authenticate(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw HttpError(401, "Authorization header not found");
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    throw HttpError(401, "Not authorized");
  }
}

export default ctrlWrapper(authenticate);