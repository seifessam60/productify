import { Router } from "express";
import usersRouter from "./users.routes";
import productsRouter from "./products.routes";
import commentsRouter from "./comments.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/comments", commentsRouter);

export default router;
