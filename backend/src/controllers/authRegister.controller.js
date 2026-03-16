import bcrypt from 'bcrypt';
import db from '../config/db'


export const registerUser = async (req, res) => {

 try {

  const { username, email, password } = req.body;

  const existingUser = await db.query(
   "SELECT id FROM app.users WHERE email=$1",
   [email]
  );

  if (existingUser.rows.length > 0) {
   return res.status(400).json({
    message: "Email already registered"
   });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await db.query(
   `INSERT INTO app.users(username,email,password)
    VALUES($1,$2,$3)
    RETURNING id,username,email`,
   [username, email, hashedPassword]
  );

  res.status(201).json({
   success: true,
   data: rows[0]
  });

 } catch (error) {

  res.status(500).json({
   message: "Registration failed"
  });

 }

};


export  default registerUser;