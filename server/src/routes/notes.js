import { Router } from "express";
const router = Router();

import {
  getNotes,
  createNote,
  getNote,
  deleteNote,
  updateNote,
} from "../controllers/notes.controller";

router.route("/").get(getNotes).post(createNote);

router.route("/:id").get(getNote).delete(deleteNote).put(updateNote);

export default router;
