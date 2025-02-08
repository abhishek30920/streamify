import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import fs from "fs";
import { createServer } from "http";




import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/songs.route.js"
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stats.route.js"
import { initializeSocket } from './lib/socket.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT;

const httpServer = createServer(app);


app.use(
	cors({
		origin: process.env.URL,
		credentials: true,
	})
);

app.use(express.json()); // to parse req.body
app.use(clerkMiddleware()); // this will add auth to req obj => req.auth

initializeSocket(httpServer);
// cron jobs

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);



// error handler

httpServer.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
	connectDB();
});