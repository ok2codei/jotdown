import db from "../config/db.js";

export const getNotes = async (req, res)=>{
   try{
    const result= await db.query("SELECT * FROM notes");
    res.status(200).json(result.rows);
   } catch(err){
    res.status()
   }
};

export const createNote = async(req,res)=>{
    try{
        co
    }
}