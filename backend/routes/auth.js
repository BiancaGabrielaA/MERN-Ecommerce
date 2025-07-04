import express from "express"
import { loginUser, registerUser,logoutUser, forgotPassword, resetPassword, getUserProfile, updatePassword } from "../controllers/authControllers.js";
import { isAuthenticatedUser } from '../middlewares/auth.js';
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserProfile)
router.route("/password/update").get(isAuthenticatedUser, updatePassword)

export default router;