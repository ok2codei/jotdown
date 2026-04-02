import express from "express";
import authRoutes from "./routes/auth.routes.js"
import { errorHandler } from "./middleware/errorHandler.js";
import userRoutes from "./routes/users.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import foldersRoutes from "./routes/folders.routes.js";
import tagsRoutes from "./routes/tags.routes.js";
import initDB from "./database/initDB.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173' 
}));
app.use("/api", authRoutes);
app.use('/users', userRoutes);
app.use('/notes', notesRoutes);
app.use('/folders', foldersRoutes);
app.use('/tags', tagsRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ status: "success", message: "Server is alive!" });
});


async function startServer() {
  try {
    await initDB();
    console.log("Database initialized");
  } catch (err) {
    console.error("Database init skipped or failed:", err.message);
    // Continue starting server anyway if the tables already exist
  }

  app.listen(5000, () => {
    console.log("Server started on port 5000");
  });
}

startServer();
