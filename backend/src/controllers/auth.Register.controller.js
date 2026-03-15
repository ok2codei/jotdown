import bcrypt from 'bcrypt';
import db from '../config/db'

const registerUser = async (req, res) => {

 try {

  const { email, password } = req.body;

  if (!email || !password) {
   return res.status(400).json({
    message: "Email and password required"
   });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.query(
   "INSERT INTO users(email, password) VALUES($1,$2) RETURNING id,email",
   [email, hashedPassword]
  );

  res.status(201).json({
   message: "User created",
   user: result.rows[0]
  });

 } catch (error) {

  res.status(500).json({
   message: "Server error"
  });

 }

};

export  default registerUser;