import db from "../config/db.js";

export const getFolders = async (req, res) => {

 try {

  const userId = req.user.user_id;

  const { rows } = await db.query(
   `SELECT * FROM app.folders
    WHERE user_id=$1`,
   [userId]
  );

  res.json({
   success: true,
   data: rows
  });

 } catch (error) {

  res.status(500).json({
   message: "Failed to get folders"
  });

 }

};

export const createFolder = async (req, res) => {

 try {

  const { name } = req.body;
  const userId = req.user.user_id;

  const { rows } = await db.query(
   `INSERT INTO app.folders(user_id,name)
    VALUES($1,$2)
    RETURNING *`,
   [userId, name]
  );

  res.status(201).json({
   success: true,
   data: rows[0]
  });

 } catch (error) {

  res.status(500).json({
   message: "Failed to create folder"
  });

 }

};

export const deleteFolder = async (req, res) => {

 try {

  const { id } = req.params;

  await db.query(
   `DELETE FROM app.folders
    WHERE id=$1`,
   [id]
  );

  res.json({
   success: true,
   message: "Folder deleted"
  });

 } catch (error) {

  res.status(500).json({
   message: "Delete failed"
  });

 }

};