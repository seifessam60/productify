import { Request, Response } from "express";
import {
  createComment,
  deleteComment,
  getCommentById,
  getProductById,
} from "../db/queries";
import { NewComment } from "../db/schema";
import { getAuth } from "@clerk/express";

// export async function getComment(req: Request, res: Response) {
//   try {
//     const { id } = req.params;
//     if (!id || typeof id !== "string") {
//       return res.status(400).json({ error: "Invalid comment ID" });
//     }
//     const comment = await getCommentById(id);

//     if (!comment) {
//       return res.status(404).json({ error: "Comment not found" });
//     }

//     res.json(comment);
//   } catch (error) {
//     console.error("Error getting comment:", error);
//     res.status(500).json({ error: "Failed to get comment" });
//   }
// }

export async function createCommentHandler(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const { productId } = req.params;
    const { content } = req.body;
    if (!productId || typeof productId !== "string" || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const newComment = await createComment({
      content,
      userId,
      productId,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
}

export async function deleteCommentHandler(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const { commentId } = req.params;
    if (!commentId || typeof commentId !== "string") {
      return res.status(400).json({ error: "Invalid comment ID" });
    }
    const comment = await getCommentById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this comment" });
    }
    await deleteComment(commentId);
    res.status(204).send();
  } catch (error: any) {
    console.error("Error deleting comment:", error);
    if (error.message?.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to delete comment" });
  }
}
