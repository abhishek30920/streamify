import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import { createServer } from "http";
import cron from "node-cron";

import { initializeSocket } from "./lib/socket.js";
import { connectDB } from "./lib/db.js";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/songs.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stats.route.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"  // Temporary file directory
}));
 // Enable file upload support
app.use(clerkMiddleware()); // Clerk authentication middleware

const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
	});
}

// Error Handling Middleware
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({
		message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
	});
	next(err); // Pass the error if necessary
});

httpServer.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
	connectDB();
});
