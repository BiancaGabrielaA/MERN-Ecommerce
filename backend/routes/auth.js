import express from "express"
import { loginUser, registerUser,logoutUser, forgotPassword, resetPassword, allUsers, getUserDetails, updateProfile, getUserProfile, updatePassword, updateUser, deleteUser } from "../controllers/authControllers.js";
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserProfile)
router.route("/password/update").get(isAuthenticatedUser, updatePassword)
router.route("/me/update").put(isAuthenticatedUser, updateProfile)
router.route("/admin/users").get( isAuthenticatedUser, authorizeRoles('admin'), allUsers);
router.route("/admin/users/:id")
       .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
       .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
       .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

export default router;