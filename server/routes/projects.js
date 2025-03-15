import express from "express";
import {getProjectsByUserId, getProject,getProjectById, addMembersByUsername} from "../controllers/projects.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Read */
router.get("/projects", verifyToken ,getProject );
router.get("/:projectId", verifyToken , getProjectById);
router.get("/:userId/projects", verifyToken , getProjectsByUserId);


/* Update */
router.post("/:projectId/members", verifyToken, async (req, res) => {
    const { projectId } = req.params;
    const { username } = req.body;
  
    try {
      await addMembersByUsername(projectId, username);
      res.status(200).json({ message: "Members added successfully." });
    } catch (err) {
      res.status(500).json({ message: `Failed to add members to project: ${err.message}` });
    }
  });

export default router;