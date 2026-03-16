import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

import {
 createTag,
 getTags,
 getTagById,
 updateTag,
 deleteTag
} from "../controllers/tags.controller.js";

const router = express.Router();

router.post("/", verifyToken, createTag);

router.get("/", verifyToken, getTags);

router.get("/:id", verifyToken, getTagById);

router.put("/:id", verifyToken, updateTag);

router.delete("/:id", verifyToken, deleteTag);

export default router;