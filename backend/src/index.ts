import express from "express";
import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

const app = express();

app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ENV.FRONTEND_URL }));

const PORT = ENV.PORT || 3000;

app.get("/api/health", (req, res) => {
  res.json({ message: "OK" });
});

app.listen(PORT, () => {
  console.log(`server Running on Port:${PORT}`);
});
