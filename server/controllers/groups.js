import Group from "../models/Group.js";
import User from "../models/User.js";
import mongoose from "mongoose";
/* Create */
export const createGroup = async (req,res) => {
    try{
        const {userId, groupName} = req.body;
        const newGroup = new Group({
            userId: userId,
            groupName,
    })
    await newGroup.save();

    const group = await Group.find(newGroup);
    res.status(201).json(group);
        
    } catch (err){
        res.status(409).json({message: err.message})
    }
};

export const getUserGroups = async (req, res) => {
  try {
    const { userId } = req.params;
    const groups = await Group.find({ userId });
    res.status(200).json(groups);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};