import { Request, Response } from "express";
import { getUserById, createUser, updateUser, upsertUser } from "../db/queries";
import { NewUser } from "../db/schema";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";

export async function syncUser(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const { name, email, imageUrl } = req.body;
    if (!name || !email || !imageUrl)
      return res.status(400).json({ error: "Missing required fields" });
    const user = await queries.upsertUser({
      id: userId,
      name,
      email,
      imageUrl,
    });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error upserting user:", error);
    res.status(500).json({ error: "Failed to upsert user" });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
}

export async function createUserHandler(req: Request, res: Response) {
  try {
    const userData: NewUser = req.body;
    const [newUser] = await createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
}

export async function updateUserHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const userData: Partial<NewUser> = req.body;
    const [updatedUser] = await updateUser(id, userData);
    res.json(updatedUser);
  } catch (error: any) {
    console.error("Error updating user:", error);
    if (error.message?.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to update user" });
  }
}

export async function upsertUserHandler(req: Request, res: Response) {
  try {
    const userData: NewUser = req.body;
    const [user] = await upsertUser(userData);
    res.json(user);
  } catch (error) {
    console.error("Error upserting user:", error);
    res.status(500).json({ error: "Failed to upsert user" });
  }
}
