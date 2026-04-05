import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../config/db.js'

const loginUser = async (req, res) => {

 try {

  const { email, password } = req.body;

  const result = await db.query(
   "SELECT * FROM app.users WHERE email=$1",
   [email]
  );

  if (result.rows.length === 0) {
   return res.status(401).json({
    message: "Invalid credentials"
   });
  }

  const user = result.rows[0];

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
   return res.status(401).json({
    message: "Invalid password"
   });
  }
  //create new token
  const token = jwt.sign(
   { user_id: user.id },
   process.env.JWT_SECRET,
   { expiresIn: "1h" }
  );

  res.json({
    success: true,
    data:{
        token 
    }
  });

 } catch (error) {

  res.status(500).json({
   message: "Server error",
   error: error.message
  });

 }

};

export default loginUser;