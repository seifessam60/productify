import { Request, Response } from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByUserId,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../db/queries";
import { NewProduct } from "../db/schema";
import { getAuth } from "@clerk/express";

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
}

export async function getProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Failed to get product" });
  }
}

export async function getUserProducts(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const products = await getProductsByUserId(userId);
    res.json(products);
  } catch (error) {
    console.error("Error getting user products:", error);
    res.status(500).json({ error: "Failed to get user products" });
  }
}

export async function createProductHandler(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const { name, description, imageUrl } = req.body;
    if (!name || !description || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const product = await createProduct({
      name,
      description,
      imageUrl,
      userId,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
}

export async function updateProductHandler(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const { id } = req.body;
    const { name, description, imageUrl } = req.body;

    const existingProduct = await getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (existingProduct.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this product" });
    }

    const updatedProduct = await updateProduct(id, {
      name,
      description,
      imageUrl,
    });

    res.json(updatedProduct);
  } catch (error: any) {
    console.error("Error updating product:", error);
    if (error.message?.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to update product" });
  }
}

export async function deleteProductHandler(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const { id } = req.body;
    const existingProduct = await getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (existingProduct.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this product" });
    }
    await deleteProduct(id);
    res.status(204).send();
  } catch (error: any) {
    console.error("Error deleting product:", error);
    if (error.message?.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to delete product" });
  }
}
