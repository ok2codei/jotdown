import express from "express"
import {
    getNotes,
    getNotesById,
    createNote,
    updateNote,
    deleteNote,
    archiveNote,
    searchNote,
    getNotesByTag
} from "../controllers/notes.controllers.js" ;
import { verifyToken } from "../middleware/authMiddleware.js";
import { validateNote } from "../middleware/validateNote.js";

const router= express.Router();

router.get("/", verifyToken,  getNotes);
router.get("/:id", verifyToken,  getNotesById);
router.post("/", verifyToken, validateNote, createNote);
router.put("/:id", verifyToken, validateNote, updateNote);
router.delete("/:id", verifyToken, validateNote, deleteNote);
router.patch("/:id/archive",verifyToken,archiveNote);
router.get("/by-tag/:tagId",verifyToken,getNotesByTag);
router.get("/search",verifyToken,searchNote);
export default router;