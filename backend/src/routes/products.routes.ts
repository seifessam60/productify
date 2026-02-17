import { Router } from "express";
import {
  getProducts,
  getProduct,
  getUserProducts,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../controllers/products.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

// GET /api/products - Get all products
router.get("/", getProducts);

// GET /api/products/:id - Get product by ID
router.get("/:id", getProduct);

// GET /api/products/my - Get products by user ID
router.get("/my", requireAuth(), getUserProducts);

// POST /api/products - Create a new product
router.post("/", requireAuth(), createProductHandler);

// PUT /api/products/:id - Update product
router.put("/:id", requireAuth(), updateProductHandler);

// DELETE /api/products/:id - Delete product
router.delete("/:id", requireAuth(), deleteProductHandler);

export default router;
