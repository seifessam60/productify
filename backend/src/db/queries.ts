import { desc, eq } from "drizzle-orm";
import { db } from "./index";
import {
  products,
  users,
  comments,
  type NewProduct,
  type NewUser,
  type NewComment,
} from "./schema";

// --- Users ---

export async function getUserById(id: string) {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
  });
}

export async function createUser(user: NewUser) {
  return await db.insert(users).values(user).returning();
}

export async function updateUser(id: string, user: Partial<NewUser>) {
  const existingUser = await getUserById(id);
  if (!existingUser) throw new Error("User with id " + id + " not found");
  return await db.update(users).set(user).where(eq(users.id, id)).returning();
}

export async function upsertUser(user: NewUser) {
  return await db
    .insert(users)
    .values(user)
    .onConflictDoUpdate({
      target: users.id,
      set: user,
    })
    .returning();
}

// --- Products ---

export async function getAllProducts() {
  return await db.query.products.findMany({
    with: { user: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });
}

export async function getProductById(id: string) {
  return await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      user: true,
      comments: {
        with: {
          user: true,
        },
        orderBy: (comments, { desc }) => [desc(comments.createdAt)],
      },
    },
  });
}

export async function getProductsByUserId(userId: string) {
  return await db.query.products.findMany({
    where: eq(products.userId, userId),
    with: { user: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });
}

export async function createProduct(product: NewProduct) {
  return await db.insert(products).values(product).returning();
}

export async function updateProduct(id: string, product: Partial<NewProduct>) {
  const existingProduct = await getProductById(id);
  if (!existingProduct) throw new Error("Product with id " + id + " not found");
  return await db
    .update(products)
    .set(product)
    .where(eq(products.id, id))
    .returning();
}

export async function deleteProduct(id: string) {
  const existingProduct = await getProductById(id);
  if (!existingProduct) throw new Error("Product with id " + id + " not found");
  return await db.delete(products).where(eq(products.id, id)).returning();
}

// --- Comments ---

export async function getCommentById(id: string) {
  return await db.query.comments.findFirst({
    where: eq(comments.id, id),
    with: {
      user: true,
    },
  });
}

export async function createComment(comment: NewComment) {
  return await db.insert(comments).values(comment).returning();
}

export async function deleteComment(id: string) {
  const existingComment = await getCommentById(id);
  if (!existingComment) throw new Error("Comment with id " + id + " not found");
  return await db.delete(comments).where(eq(comments.id, id)).returning();
}
