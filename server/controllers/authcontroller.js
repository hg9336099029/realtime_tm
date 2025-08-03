// ✅ controllers/authcontroller.js
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: "Email already exists" });

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  res.status(201).json({ user: { id: user._id, name, email }, token });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ msg: "Invalid email or password" });

  const token = generateToken(user._id);
  res.json({ user: { id: user._id, name: user.name, email }, token });
};

export const logoutUser = async (req, res) => {
  // If you're using token-based auth (JWT), logout on frontend by clearing the token.
  // But for backend response:
  res.status(200).json({ msg: "Logged out successfully" });
};

