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


app.use(cors({
  origin: ['http://localhost:5173',
    'https://jotdown-eta.vercel.app'
  ],
  credentials: true,
}));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/folders", foldersRoutes);
app.use("/api/tags", tagsRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ status: "success", message: "Server is alive!" });
});


async function startServer() {
  try {
    await initDB();
    console.log("Database initialized");
  } catch (err) {
    console.error("Database init failed:", err.message);
  }

  // Use Render's port, or 5000 for local development
  const PORT = process.env.PORT || 5000;

  // Listen on '0.0.0.0' to ensure Render can see the traffic
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
  });
}

startServer();
