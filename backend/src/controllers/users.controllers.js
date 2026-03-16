import db from "../config/db.js";

export const getUserProfile = async (req, res) => {

 try {

  const userId = req.user.user_id;

  const { rows } = await db.query(
   `SELECT id, username, email, created_at
    FROM app.users
    WHERE id=$1`,
   [userId]
  );

  res.json({
   success: true,
   data: rows[0]
  });

 } catch (error) {

  res.status(500).json({
   message: "Failed to fetch user"
  });

 }

};


export const updateUser = async (req, res) => {

 try {

  const userId = req.user.user_id;
  const { username, email } = req.body;
  const { rows } = await db.query(
   `UPDATE app.users
    SET username=$1,
        email=$2,
        updated_at=NOW()
    WHERE id=$3
    RETURNING id,username,email`,
   [username, email, userId]
  );

  res.json({
   success: true,
   data: rows[0]
  });

 } catch (error) {
  res.status(500).json({
    success: false,
   message: "Update failed"
  });

 }

};

export const deleteUser = async (req, res) => {

 try {

  const userId = req.user.user_id;

  await db.query(
   `UPDATE app.users
    SET deleted_at = NOW()
    WHERE id=$1`,
   [userId]
  );

  res.json({
   success: true,
   message: "Account deleted"
  });

 } catch (error) {

  res.status(500).json({
   message: "Delete failed"
  });

 }

};