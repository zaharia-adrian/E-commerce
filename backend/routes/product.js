import express from "express";

import requireAuth from "../middleware/requireAuth.js";

import {
  createProduct,
  deleteProduct,
  editProduct,
  getProducts,
  getUserProducts,
} from "../controllers/product.js";

const router = express.Router();

router.get("/products", getProducts);

router.use(requireAuth);

router.post("/create-product", createProduct);

router.get("/user-products", getUserProducts);

router.delete("/delete-product/:productId", deleteProduct);

router.patch("/edit-product/:productId", editProduct);

export default router;
