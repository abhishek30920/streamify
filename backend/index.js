import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import fs from "fs";
import { createServer } from "http";

import {connectDB} from "./src/lib/db.js"
import userRoutes from "./src/routes/user.route.js";
import adminRoutes from "./src/routes/admin.route.js";
import authRoutes from "./src/routes/auth.route.js";
import songRoutes from "./src/routes/songs.route.js"
import albumRoutes from "./src/routes/album.route.js";
import statRoutes from "./src/routes/stats.route.js"
import { initializeSocket } from './src/lib/socket.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const httpServer = createServer(app);

// Initialize middleware
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(express.json());
app.use(clerkMiddleware());

initializeSocket(httpServer);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// Start server function
const startServer = async () => {
    try {
        // Connect to MongoDB first
        await connectDB();
        
        // Then start the server
        httpServer.listen(PORT, () => {
            console.log("Server is running on port " + PORT);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        // Retry connection after 5 seconds
        console.log("Retrying in 5 seconds...");
        setTimeout(startServer, 5000);
    }
};

// Start the server
startServer();