import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { assignToken } from "../lib/jwt.js";
export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are reqired" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be not less than 6 characters" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "Sign up succesfull" });
  } catch (error) {
    console.log("error in user controller signup", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = assignToken(user._id, res);
    return res.status(200).json({ token, user });
  } catch (error) {
    console.log("Failed to login User", error);
  }
};

export const getUsers = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await User.findById(userId).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    console.log("error in get users fn", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAddress = async (req, res) => {
  const { userId } = req.user;
  const { address } = req.body;
  console.log(address);
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        address: address,
      },
      { new: true }
    ).select("-password");
    if (!user) {
      return res.status(404).json("User not found");
    }
    return res
      .status(200)
      .json({ user, message: "Adress updated succesfully" });
  } catch (error) {
    console.log("Error in changing address", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
