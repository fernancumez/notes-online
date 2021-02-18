import Note from "../models/note.models";

// Function to get only one note
export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) return res.status(404).json({ error: "Note not found" });

    return res.status(200).json(note);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Function to get and list all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Function to create new notes
export const createNote = async (req, res) => {
  try {
    const { title, content, date, author } = req.body;

    const body = {
      title,
      content,
      date,
      author,
    };

    const newNote = new Note(body);
    const note = await newNote.save();
    return res.status(201).json({ message: "New Note added", note });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Function to update notes
export const updateNote = async (req, res) => {
  try {
    const { title, content, duration, author } = req.body;

    const data = {
      title,
      content,
      duration,
      author,
    };

    const noteUpdated = await Note.findByIdAndUpdate(req.params.id, data);
    if (!noteUpdated) return res.status(404).json({ error: "Note not found" });

    const note = await Note.findById(req.params.id);
    return res.status(200).json({ message: "Note Updated", note });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Function to delete notes
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const noteDeleted = await Note.findByIdAndDelete(id);
    if (!noteDeleted) return res.status(404).json({ error: "Note not found" });

    return res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
