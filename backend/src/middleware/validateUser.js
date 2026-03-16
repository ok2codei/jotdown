export const validateRegister = (req, res, next) => {

 const { username, email, password } = req.body;

 if (!username || !email || !password) {
  return res.status(400).json({
   message: "All fields are required"
  });
 }

 if (username.length < 3) {
  return res.status(400).json({
   message: "Username must be at least 3 characters"
  });
 }

 const emailRegex = /\S+@\S+\.\S+/;

 if (!emailRegex.test(email)) {
  return res.status(400).json({
   message: "Invalid email"
  });
 }

 if (password.length < 6) {
  return res.status(400).json({
   message: "Password must be at least 6 characters"
  });
 }

 next();
};



export const validateLogin = (req, res, next) => {

 const { email, password } = req.body;

 if (!email || !password) {
  return res.status(400).json({
   message: "Email and password required"
  });
 }

 next();

};