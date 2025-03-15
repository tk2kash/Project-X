import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

const groupIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];

export const users = [
    {
        _id: userIds[0],
        firstName: "test",
        lastName: "one",
        userName: "unqiue",
        email: "abcge@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        age: 20,
        groups:[groupIds[1]],
    },
    {
        _id: userIds[1],
        firstName: "test2",
        lastName: "one2",
        userName: "unqiue2",
        email: "abcge2@gmail.com",
        password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        age: 20,
        groups: [groupIds[1]],
    },
    
];
export const groups = [
    {
        _id: groupIds[1],
        userId: userIds[1],
        groupName: "project", 
    },
];
export const projects = [
    {
        _id: new mongoose.Types.ObjectId(),
        groupId: groupIds[1],
        projectName: "project new 2",
        description:" what project",
    },
];