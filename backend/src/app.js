import express from "express";
import userRoutes from "./routes/users.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import foldersRoutes from "./routes/folders.routes.js";
import tagsRoutes from "./routes/tags.routes.js";

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/notes', notesRoutes);
app.use('/folders', foldersRoutes);
app.use('/tags', tagsRoutes)


app.listen(3000, () => {
  console.log("Server running on port 3000");
});