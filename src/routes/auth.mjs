import express from "express";
import { createUser, login, logout } from "../controllers/authController.mjs";

const router = express.Router();

router.post("/login", login);
router.post("/register", createUser);
router.post("/logout", logout);

export default router;
