import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
      text: { 
          type: String,
          required: true },
      user: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'User', 
          required: true },
      project: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Project', 
          required: true },
      readBy: [{ 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'User' }],
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;