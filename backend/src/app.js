import express from "express";
import authRoutes from "./routes/auth.routes.js"
import { errorHandler } from "./middleware/errorHandler.js";
import userRoutes from "./routes/users.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import foldersRoutes from "./routes/folders.routes.js";
import tagsRoutes from "./routes/tags.routes.js";
import initDB from "./database/initDB.js";

const app = express();

app.use(express.json());

app.use("/api", authRoutes);
app.use('/users', userRoutes);
app.use('/notes', notesRoutes);
app.use('/folders', foldersRoutes);
app.use('/tags', tagsRoutes);
app.use(errorHandler);
async function startServer() {

 await initDB();

 app.listen(5000, () => {
  console.log("Server started");
 });

}

startServer();
