import mongoose from "mongoose";
import moment from "moment";

const TaskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['todo', 'In-progress','Review', 'Completed'],
      default: 'todo',
    },
    startDate:{
      type: Date,
    },
    dueDate: {
      type: Date,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    createdOn: {
      type: Date,
      default: Date.now,
    },
});



const Task = mongoose.model("Task", TaskSchema);
export default Task;