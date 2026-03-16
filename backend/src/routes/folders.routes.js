import express from "express";
import {
 createFolder,
 getFolders,
 deleteFolder
} from "../controllers/folders.controller.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getFolders);

router.post("/", verifyToken, createFolder);

router.delete("/:id", verifyToken, deleteFolder);

export default router;