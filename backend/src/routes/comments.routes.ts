import { Router } from "express";
import {
  createCommentHandler,
  deleteCommentHandler,
} from "../controllers/comments.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

// GET /api/comments/:id - Get comment by ID
// router.get("/:id", getComment);

// POST /api/comments - Create a new comment
router.post("/:productId", requireAuth(), createCommentHandler);

// DELETE /api/comments/:id - Delete comment
router.delete("/:commentId", requireAuth(), deleteCommentHandler);

export default router;
