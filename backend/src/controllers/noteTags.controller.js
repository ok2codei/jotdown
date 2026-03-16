

export const removeTagFromNote = async (req, res) => {

 try {

  const { note_id, tag_id } = req.body;

  const result = await db.query(
   `DELETE FROM app.note_tags
    WHERE note_id=$1
    AND tag_id=$2`,
   [note_id, tag_id]
  );

  if (result.rowCount === 0) {
   return res.status(404).json({
    message: "Tag not found for this note"
   });
  }

  res.json({
   success: true,
   message: "Tag removed from note"
  });

 } catch (error) {

  res.status(500).json({
   message: "Failed to remove tag"
  });

 }

};