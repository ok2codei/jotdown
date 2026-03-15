import db from "../config/db.js";

export const getNotes = async (req, res) => {
  try {
    const { user_id } = req.query;

    const userId = req.user.user_id;

    const { rows } = await db.query(
      `SELECT * FROM app.notes
       WHERE user_id = $1
       AND deleted_at IS NULL`,
      [userId]
    );

    res.status(200).json({
      success: true,
      data: rows
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get notes"
    });
  }
};

export const getNotesById = async (req, res)=>{
    try{
        const { id }= req.params;
        const userId = req.user.user_id;
        const {rows}= await db.query(
          `SELECT * FROM app.notes
           WHERE note_id=$1
           AND user_id=$2
           AND deleted_at IS NULL`
           , [id, userId]);

        if(rows.length===0){
            return res.status(404).json({
                success:false,
                message: "Note not found"
            });
        }
        
            res.status(200).json({
                success:true,
                data:rows[0]
            });
        
    }catch(error){
        res.status(500).json({
            success:false,
            message: "Failed to get note"
        })
    };
};

export const createNote = async (req, res) => {

  try {
    const { title, content } = req.body;
    const userId = req.user.user_id;


    const { rows } = await db.query(
      `INSERT INTO app.notes(title, content, user_id) VALUES($1,$2,$3) RETURNING *`,
      [title, content, userId]
    );

    res.status(201).json({
      success: true,
      data: rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create note"
    });
  }
}

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.user_id;

    const { rows } = await db.query(
      `UPDATE app.notes
       SET title = $1,
           content = $2,
           updated_at = CURRENT_TIMESTAMP
       WHERE note_id = $3
       AND user_id = $4
       RETURNING *`,
      [title, content, id,userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update note"
    });
  }
};


export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user_id;

    const { rowCount } = await db.query(
      `UPDATE app.notes
       SET deleted_at = CURRENT_TIMESTAMP
       WHERE note_id = $1
       AND user_id = $2`,
      [id,userId]
    );

    if (rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete note"
    });
  }
};