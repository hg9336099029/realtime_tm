// ✅ controllers/authcontroller.js
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// JWT Token generator
const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ✅ Register Controller
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const user = new User({
      name: username, // map frontend's username to model's name
      email,
      password, // will be hashed by pre-save middleware
    });

    await user.save();
    const token = generateToken(user._id);

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};


// ✅ Login Controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      user: { id: user._id, name: user.name, email },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};

// ✅ Logout Controller
export const logoutUser = async (req, res) => {
  res.status(200).json({ msg: "Logged out successfully" });
};
