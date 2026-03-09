import express from "express"

const router= express.Router();

router.get("/", getNotes);

router.get("/:id", getNotesById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;