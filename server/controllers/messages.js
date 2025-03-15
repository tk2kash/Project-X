import Message from "../models/Message.js";

export const createMessage = async (req,res) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json(message);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
};
export const getMessages = async (req,res) => {
    try {
        const messages = await Message.find({ project: req.params.projectId })
          .populate('user', 'userName')
          .populate('readBy', 'userName')
          .sort('createdAt');
        res.status(200).json(messages);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }

};
export const markAsRead = async (req,res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
          return res.status(404).json({ error: 'Message not found' });
        }
        if (!message.readBy.includes(req.user._id)) {
          message.readBy.push(req.user._id);
          await message.save();
        }
        res.status(200).json({ message: 'Message marked as read' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
};
