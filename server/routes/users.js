import express from "express";
import {
    getUser,
    getUserGroups,
    addRemoveFromGroup,
    getUserByUsername,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Read */
router.get("/:id", verifyToken, getUser);
router.get("/:id", verifyToken, getUserGroups);
router.get("/name/:userName", verifyToken, getUserByUsername);

/* Update */

router.patch("/:id/:groupID", verifyToken, addRemoveFromGroup);

export default router;