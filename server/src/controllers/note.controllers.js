import Note from "../models/note.models";
import User from "../models/user.models";

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
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const paginateOptions = {
      limit,
      page,
      populate: {
        path: "author",
        select: "username",
      },
    };

    const notes = await Note.paginate({}, paginateOptions);

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Function to create new notes
export const createNote = async (req, res) => {
  try {
    const { title, content, date, author } = req.body;

    const user = await User.findById(author);

    const newNote = new Note({
      title,
      content,
      date,
      author: user._id,
    });

    const note = await newNote.save();

    user.notes = user.notes.concat(note._id);
    await user.save();

    const savedNote = await Note.findById(note._id).populate("author", {
      username: 1,
    });

    return res.status(201).json({ message: "New Note added", note: savedNote });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Function to update notes
export const updateNote = async (req, res) => {
  try {
    if (req.params.userId !== req.body.author) {
      const updateUser = await User.findById(req.params.userId);
      updateUser.notes = updateUser.notes.filter(
        (noteId) => noteId.toString() !== req.params.noteId
      );

      await updateUser.save();

      const updatedUser = await User.findById(req.body.author);
      updatedUser.notes = updatedUser.notes.concat(req.params.noteId);
      await updatedUser.save();
    }

    const noteUpdated = await Note.findByIdAndUpdate(
      req.params.noteId,
      req.body
    );

    if (!noteUpdated) return res.status(404).json({ error: "Note not found" });

    const note = await Note.findById(req.params.noteId).populate("author", {
      username: 1,
    });
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

    const user = await User.findById(noteDeleted.author);

    user.notes = user.notes.filter(
      (noteId) => noteId.toString() !== noteDeleted._id.toString()
    );

    await user.save();

    return res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
