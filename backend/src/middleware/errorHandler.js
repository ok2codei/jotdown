export function errorHandler(err, req, res, next) {

 console.error(err);

 res.status(err.status || 500).json({
  success:false,
  message: err.message || "Internal Server Error"
 });

}


// try this later} catch (error) {
//   // 1. Log the full object to your Linux terminal
//   console.error("ERROR LOCATION: [notes.controller.js -> createNote]");
//   console.error(error); 

//   // 2. Send the specific message back to curl for quick debugging
//   res.status(500).json({
//     success: false,
//     message: error.message, 
//     stack: process.env.NODE_ENV === 'development' ? error.stack : null
//   });
// }