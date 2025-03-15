import express from "express";
import {getUserGroups} from "../controllers/groups.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Read */
router.get("/:userId/groups", verifyToken , getUserGroups);

/* Update */

export default router;