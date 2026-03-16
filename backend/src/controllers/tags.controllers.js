import db from "../config/db.js"

export const createTag = async (req, res) => {

 try {

  const { name } = req.body;

  const { rows } = await db.query(
   `INSERT INTO app.tags(name)
    VALUES($1)
    RETURNING *`,
   [name]
  );

  res.status(201).json({
   success: true,
   data: rows[0]
  });

 } catch (error) {

  res.status(500).json({
   message: "Failed to create tag"
  });

 }

};



export const getTags = async (req, res) => {

 try {

  const { rows } = await db.query(
   `SELECT *
    FROM app.tags
    WHERE deleted_at IS NULL
    ORDER BY name`
  );

  res.json({
   success: true,
   data: rows
  });

 } catch (error) {

  res.status(500).json({
   message: "Failed to get tags"
  });

 }

};
export const getTagById = async (req, res) => {

 try {

  const { id } = req.params;

  const { rows } = await db.query(
   `SELECT *
    FROM app.tags
    WHERE tag_id=$1
    AND deleted_at IS NULL`,
   [id]
  );

  if (rows.length === 0) {
   return res.status(404).json({
    message: "Tag not found"
   });
  }

  res.json({
   success: true,
   data: rows[0]
  });

 } catch (error) {

  res.status(500).json({
   message: "Failed to fetch tag"
  });

 }

};


export const updateTag = async (req, res) => {

 try {

  const { id } = req.params;
  const { name } = req.body;

  const { rows } = await db.query(
   `UPDATE app.tags
    SET name=$1,
        updated_at=CURRENT_TIMESTAMP
    WHERE tag_id=$2
    RETURNING *`,
   [name, id]
  );

  if (rows.length === 0) {
   return res.status(404).json({
    message: "Tag not found"
   });
  }

  res.json({
   success: true,
   data: rows[0]
  });

 } catch (error) {

  res.status(500).json({
   message: "Failed to update tag"
  });

 }

};


export const deleteTag = async (req, res) => {

 try {

  const { id } = req.params;

  const result = await db.query(
   `UPDATE app.tags
    SET deleted_at = CURRENT_TIMESTAMP
    WHERE tag_id=$1`,
   [id]
  );

  if (result.rowCount === 0) {
   return res.status(404).json({
    message: "Tag not found"
   });
  }

  res.json({
   success: true,
   message: "Tag deleted"
  });

 } catch (error) {

  res.status(500).json({
   message: "Failed to delete tag"
  });

 }

};