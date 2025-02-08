import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import { connectDB } from "../lib/db.js"; // Adjust path if needed
import userRoutes from "../routes/user.route.js";
import adminRoutes from "../routes/admin.route.js";
import authRoutes from "../routes/auth.route.js";
import songRoutes from "../routes/songs.route.js";
import albumRoutes from "../routes/album.route.js";
import statRoutes from "../routes/stats.route.js";

dotenv.config();

const app = express();

app.use(
	cors({
		origin: process.env.URL,
		credentials: true,
	})
);

app.use(express.json()); 
app.use(clerkMiddleware());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// Connect to DB
connectDB();

// Export as a Vercel function
export default app;
