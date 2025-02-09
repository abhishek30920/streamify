import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

export const initializeSocket = (server) => {
	console.log("herer-----------")
	const io = new Server(server, {
    cors: {
      origin: process.env.URL,
      credentials: true,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
    // Add security settings
    pingTimeout: 60000,
    // Enable WebSocket transport
    transports: ['websocket', 'polling']
  });
	console.log(process.env.MONGO_URI)
console.log("HER=======================")
	const userSockets = new Map(); // { userId: socketId}
	const userActivities = new Map(); // {userId: activity}
console.log(userSockets)
console.log(userActivities)
	io.on("connection", (socket) => {
		console.log("user connect")
		socket.on("user_connected", (userId) => {
			userSockets.set(userId, socket.id);
			console.log(userSockets
			)
			userActivities.set(userId, "Idle");
			console.log("user connect in")
			// broadcast to all connected sockets that this user just logged in
			io.emit("user_connected", userId);

			socket.emit("users_online", Array.from(userSockets.keys()));
		
			io.emit("activities", Array.from(userActivities.entries()));
		});

		socket.on("update_activity", ({ userId, activity }) => {
			console.log("activity updated", userId, activity);
			userActivities.set(userId, activity);
			io.emit("activity_updated", { userId, activity });
		});

		socket.on("send_message", async (data) => {
			try {
				const { senderId, receiverId, content } = data;

				const message = await Message.create({
					senderId,
					receiverId,
					content,
				});

				// send to receiver in realtime, if they're online
				const receiverSocketId = userSockets.get(receiverId);
				if (receiverSocketId) {
					io.to(receiverSocketId).emit("receive_message", message);
				}

				socket.emit("message_sent", message);
			} catch (error) {
				console.error("Message error:", error);
				socket.emit("message_error", error.message);
			}
		});

		socket.on("disconnect", () => {
			let disconnectedUserId;
			for (const [userId, socketId] of userSockets.entries()) {
				// find disconnected user
				if (socketId === socket.id) {
					disconnectedUserId = userId;
					userSockets.delete(userId);
					userActivities.delete(userId);
					break;
				}
			}
			if (disconnectedUserId) {
				io.emit("user_disconnected", disconnectedUserId);
			}
		});
	});
};