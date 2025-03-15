import Group from "../models/Group.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import mongoose from "mongoose";

/* Create */
export const createProject = async (req,res) => {
    try{
        console.log(req.body.name);
        const { name, description, members, createdBy, startDate, dueDate } = req.body;
        const project = new Project({ name, description, members, createdBy, startDate, dueDate });
        const savedProject = await project.save();

        res.status(201).json(savedProject);
        
    } catch (err){
        res.status(409).json({message: err.message})
    }
};

// Get all projects
export const getProject = async (req, res) => {
  try {
    const projects = await Project.find().populate('members createdBy');
    res.status(200).json(projects);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


// Get a single project by ID
export const getProjectById = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId)
      .populate('members', '_id userName')
      .populate('createdBy', '_id userName');

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};
// Get a single project by user ID
export const getProjectsByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: userId },
        { members: userId }
      ]
    }).populate('createdBy members');
    console.log(projects);
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};
// add memeber by users name
export const addMembersByUsername = async (projectId, username) => {
  try {
    const userName = username;
    const user = await User.findOne({ userName }).select('_id');
    console.log("user");
    console.log(user);
    const userId = user._id;
    const project = await Project.findById(projectId);
    console.log("project");
    console.log(project);
    const existingMembers = project.members.map(member => member.toString());
    console.log("existing");
    console.log(existingMembers);
    if (!existingMembers.includes(userId.toString())) {
      await Project.findByIdAndUpdate(projectId, { $push: { members: userId } });
    }
  } catch (err) {
    throw new Error(`Failed to add member to project: ${err.message}`);
  }
};

// Update a project by ID
export const updateProjectById = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    req.body,
  { new: true }
    ).populate('members createdBy');
      res.json(updatedProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Delete a project by ID
  export const deleteProjectById = async (req, res) => {
    const projectId = req.params.projectId;
    try {
      const deletedProject = await Project.findByIdAndDelete(projectId);
      if (!deletedProject) {
        res.status(404).json({ message:'Project not found' });
      return;
    }
    res.json(deletedProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };