import { Router } from "express";
import {
  getUser,
  createUserHandler,
  updateUserHandler,
  upsertUserHandler,
  syncUser,
} from "../controllers/users.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

router.post("/sync", requireAuth(), syncUser);
// GET /api/users/:id - Get user by ID
router.get("/:id", getUser);

// POST /api/users - Create a new user
router.post("/", createUserHandler);

// PUT /api/users/:id - Update user
router.put("/:id", updateUserHandler);

// POST /api/users/upsert - Upsert user (create or update)
router.post("/upsert", upsertUserHandler);

export default router;
