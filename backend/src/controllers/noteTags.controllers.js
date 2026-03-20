import db from "../config/db.js";

export const addTagToNote = async (req, res) => {

 try {

  const { note_id, tag_id } = req.body;

  const { rows } = await db.query(
   `INSERT INTO app.note_tags(note_id,tag_id)
    VALUES($1,$2)
    RETURNING *`,
   [note_id, tag_id]
  );

  res.status(201).json({
   success: true,
   data: rows[0]
  });

 } catch (error) {

  res.status(500).json({
   message: "Failed to add tag"
  });

 }

};

export const removeTagFromNote = async (req, res) => {

 try {

  const { note_id, tag_id } = req.body;

  await db.query(
   `DELETE FROM app.note_tags
    WHERE note_id=$1
    AND tag_id=$2`,
   [note_id, tag_id]
  );

  res.json({
   success: true,
   message: "Tag removed"
  });

 } catch (error) {

  res.status(500).json({
   message: "Failed to remove tag"
  });

 }

}
  