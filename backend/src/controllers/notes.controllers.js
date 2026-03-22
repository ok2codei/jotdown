import db from "../config/db.js";

export const getNotes = async (req, res) => {

 try {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;

  const userId = req.user.user_id;

  // get total count
  const totalResult = await db.query(
   `SELECT COUNT(*) FROM app.notes
    WHERE user_id=$1
    AND deleted_at IS NULL`,
    [userId]
  );

  const total = parseInt(totalResult.rows[0].count);

  // get paginated notes
  const { rows } = await db.query(
   `SELECT * FROM app.notes
    WHERE user_id=$1
    AND deleted_at IS NULL
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3`,
   [userId, limit, offset]
  );

  res.status(200).json({
   success: true,
   page,
   limit,
   total,
   data: rows
  });

 } catch (error) {
  console.error(error);
  res.status(500).json({
   success:false,
   message:"Failed to fetch notes"
  });

 }

};

export const getNotesById = async (req, res)=>{
    try{
        const { id }= req.params;
        const userId = req.user.user_id;
        const {rows}= await db.query(
          `SELECT * FROM app.notes
           WHERE id=$1
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
       WHERE id = $3
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
       WHERE id = $1
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


// Special operation on Notes
export const archiveNote = async (req, res) => {

 try {

  const { id } = req.params;

  const { rows } = await db.query(
   `UPDATE app.notes
    SET is_archived = TRUE,
        updated_at = CURRENT_TIMESTAMP
    WHERE id=$1
    AND user_id=$2
    RETURNING *`,
   [id, req.user.user_id]
  );

  if (rows.length === 0) {
   return res.status(404).json({
    message: "Note not found"
   });
  }

  res.json({
   success: true,
   data: rows[0]
  });

 } catch (error) {

  res.status(500).json({
   message: "Archive failed"
  });

 }

};

export const getNotesByTag = async (req, res) => {

 try {

  const { tagId } = req.params;

  const { rows } = await db.query(
   `SELECT n.*
    FROM app.notes n
    JOIN app.note_tags nt
    ON n.id = nt.note_id
    WHERE nt.tag_id=$1
    AND n.user_id=$2
    AND n.deleted_at IS NULL`,
   [tagId, req.user.user_id]
  );

  res.json({
   success: true,
   data: rows
  });

 } catch (error) {

  res.status(500).json({
   message: "Failed to fetch notes by tag"
  });

 }

};

export const searchNote = async (req, res) => {

 try {

  const { q } = req.query;

  const { rows } = await db.query(
   `SELECT *
    FROM app.notes
    WHERE user_id=$1
    AND deleted_at IS NULL
    AND (
        title ILIKE $2
        OR content ILIKE $2
    )
    ORDER BY created_at DESC`,
   [req.user.user_id, `%${q}%`]
  );

  res.json({
   success: true,
   data: rows
  });

 } catch (error) {

  res.status(500).json({
   message: "Search failed"
  });

 }

};

export const getNotesWithTags = async (req, res) => {

 try {

  const { rows } = await db.query(
   `SELECT 
     n.id,
     n.title,
     json_agg(t.name) AS tags
    FROM app.notes n
    LEFT JOIN app.note_tags nt
    ON n.id = nt.note_id
    LEFT JOIN app.tags t
    ON nt.tag_id = t.tag_id
    WHERE n.user_id=$1
    AND n.deleted_at IS NULL
    GROUP BY n.id
    ORDER BY n.created_at DESC`,
   [req.user.user_id]
  );

  res.json({
   success: true,
   data: rows
  });

 } catch (error) {

  res.status(500).json({
   message: "Failed to fetch notes"
  });

 }

};