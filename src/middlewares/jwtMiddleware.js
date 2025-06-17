import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

export const isAutorized = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(404).json({ message: "token invalido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req.user = decoded), next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
