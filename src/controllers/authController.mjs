import { config } from "dotenv";
import User from "../models/User.mjs";
import { generateToken } from "../middlewares/authMiddleware.mjs";
import { logger } from "../utils/logger.mjs";

export const createUser = async (req, res) => {
  try {
    let { username, email, password, name, role = "user" } = req.body;
    username = username.trim().toLowerCase();
    email = email.trim().toLowerCase();
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      logger.error("User already exists");
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const newUser = new User({
      username,
      email,
      password,
      name,
      role,
    });

    await newUser.save().catch((error) => {
      if (error.code === 11000) {
        logger.error("User already exists");
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }
    });

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username: username.trim().toLowerCase(),
    });
    if (!user) {
      logger.error("User not found");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!user.comparePassword(password)) {
      logger.error("Invalid password");
      return res
        .status(404)
        .json({ success: false, message: "Invalid password" });
    }

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
