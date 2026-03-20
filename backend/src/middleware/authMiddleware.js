import jwt from "jsonwebtoken"

export const verifyToken= async (req, res, next) => {

 const authHeader = req.headers.authorization;

 if (!authHeader) {
  return res.status(401).json({
   message: "Token required"
  });
 }

 const token = authHeader.split(" ")[1];

 try {

  const decoded = jwt.verify(
   token,
   process.env.JWT_SECRET
  );
  
  const userCheck = await db.query(
      "SELECT id FROM app.users WHERE id = $1 AND deleted_at IS NULL",
      [decoded.user_id]
    );

    if (userCheck.rows.length === 0) {
      return res.status(401).json({ message: "User no longer exists or is deactivated" });
    }
  req.user = decoded;

  next();

 } catch (error) {

  return res.status(403).json({
   message: "Invalid token"
  });

 }

};
