import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },   
    startDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['planned', 'in progress', 'completed'],
      default: 'planned',
    },
    },{timestamps: true}
);
const Project = mongoose.model("Project", ProjectSchema);
export default Project;
    