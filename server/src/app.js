import express from "express";
import cors from "cors";

import { Config } from "./config";
import noteRoutes from "./routes/notes";
import userRoutes from "./routes/users";

const app = express();

// Config
app.set("port", Config.PORT);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

export default app;
