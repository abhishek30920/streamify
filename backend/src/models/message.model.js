import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true }, // Fixed spelling: 'reciever' to 'receiver'
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Message = model('Message', messageSchema);
