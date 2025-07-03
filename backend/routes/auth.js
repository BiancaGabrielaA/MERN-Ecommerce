import express from "express"
import { loginUser, registerUser,logoutUser } from "../controllers/authControllers.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

export default router;