export function validateNote(req, res, next) {

 const { title, content } = req.body;

 if (!title || !content) {
  return res.status(400).json({
   success:false,
   message:"Title and content are required"
  });
 }

 if (title.length > 200) {
  return res.status(400).json({
   success:false,
   message:"Title too long"
  });
 }

 next();
}