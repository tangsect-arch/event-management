import { config } from "dotenv";
import User from "../models/User.mjs";
import { generateToken } from "../middlewares/authMiddleware.mjs";

export const createUser = async (req, res) => {
  console.log("registering user", req.body);
  try {
    let { username, email, password, name, role = "user" } = req.body;
    username = username.trim().toLowerCase();
    email = email.trim().toLowerCase();
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      username,
      email,
      password,
      name,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username: username.trim().toLowerCase(),
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.comparePassword(password)) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({
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
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
