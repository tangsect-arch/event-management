import jwt from "jsonwebtoken";
import { env } from "../config/env.mjs";
export const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(400).json({ message: "Invalid token." });
  }
};

export const verifyAdmin = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access forbidden. Admins only." });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(400).json({ message: "Invalid token." });
  }
};

export const generateToken = (user) => {
  const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRATION || "1h",
  });
  return token;
};
