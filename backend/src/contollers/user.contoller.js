import { User } from './../models/user.model.js';
import { Message } from './../models/message.model.js';
export const getAllUsers = async (req, res) => {

  try{
    const currentUserId=req.auth.userId
		console.log(req.auth)
    const users = await User.find({ clerkId: { $ne: currentUserId } });
		console.log(users)
    res.status(200).json(users);
    
  }
  catch{
    res.status(500).json({message: "Server Error"});
  } 
}

export const getMessages = async (req, res, next) => {
	try {
		const myId = req.auth.userId;
		const { userId } = req.params;
		console.log(userId);
		const messages = await Message.find({
			$or: [
				{ senderId: userId, receiverId: myId },
				{ senderId: myId, receiverId: userId },
			],
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (error) {
		next(error);
	}
};