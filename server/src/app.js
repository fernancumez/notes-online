import express from "express";
import cors from "cors";

import { Config } from "./config";
import noteRoutes from "./routes/notes.routes";
import userRoutes from "./routes/users.routes";

const app = express();

// Config
app.set("port", Config.PORT);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

export default app;
