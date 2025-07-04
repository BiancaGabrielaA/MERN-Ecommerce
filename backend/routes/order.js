import express from "express"
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
import { newOrder, getOrderDetails, allOrders, getMyOrders, getOrder, updateOrder, deleteOrder } from "../controllers/orderController.js";

const router = express.Router()

router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);
router.route("/admin/orders/:id")
        .get(isAuthenticatedUser, authorizeRoles("admin"), getOrder)
        .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
        .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);


router.route("/me/orders").get(isAuthenticatedUser, getMyOrders)



export default router;