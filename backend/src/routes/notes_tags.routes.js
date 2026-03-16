import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

import {
 addTagToNote,
 removeTagFromNote
} from "../controllers/noteTags.controller.js";

const router = express.Router();

router.post("/", verifyToken, addTagToNote);

router.delete("/", verifyToken, removeTagFromNote);

export default router;