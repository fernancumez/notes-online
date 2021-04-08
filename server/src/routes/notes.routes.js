import { Router } from "express";
const router = Router();

import {
  getNotes,
  createNote,
  getNote,
  deleteNote,
  updateNote,
} from "../controllers/note.controllers";

router.route("/").get(getNotes).post(createNote);

router.route("/:id").get(getNote).delete(deleteNote);

router.route("/:userId/:noteId").put(updateNote);

export default router;
