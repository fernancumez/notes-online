import User from "../models/user.models";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Function to get and list all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("notes", {
      title: 1,
      content: 1,
      date: 1,
    });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Function to create new users
export const createUser = async (req, res) => {
  try {
    const { username } = req.body;

    const newUser = new User({ username });
    const user = await newUser.save();

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Function to delete users
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.notes.length > 0)
      return res.status(400).json({ message: "Can´t delete this user" });

    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
