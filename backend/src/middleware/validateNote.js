export function validateNote(req, res, next) {

 const { title } = req.body;

 if (!title || title.trim() === "") {
  return res.status(400).json({
   success:false,
   message:"Title required"
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


// validate security of note content- monitor any malicous entries