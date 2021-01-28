import User from "../models/User";

// Function to get and list all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error });
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
    const userDeleted = await User.findByIdAndDelete(id);
    if (!userDeleted) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
