import express from 'express'
import { deleteProduct, getProductDetails, getProducts, newProduct, updateProduct } from '../controllers/productControllers.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
const router = express.Router();

router.route("/products").get(isAuthenticatedUser, getProducts);
router.route("/admin/products").post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router.route("/products/:id").get(getProductDetails);
router.route("/admin/products/:id").put( authorizeRoles("admin"), updateProduct);
router.route("/admin/products/:id").delete( authorizeRoles("admin"), deleteProduct);




export default router;