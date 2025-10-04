const bcrypt = require("bcrypt");
const mongoose=require("mongoose");
const jwt = require("jsonwebtoken");
const Users = require("../models/user.model.js");
 const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;
const register = async (req, res)=>{
  const { name, email, password,phone } = req.body;
  if (!name || !email || !password || !phone)
    return res.status(400).json({ message: "Name, email, password, and phone are required" });
 const User = mongoose.connection.db.collection("users");
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists!" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.insertOne({ name, email, password: hashedPassword ,phone:phone});
  return res.status(201).json({ message: "User created successfully", user });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });
  const user = await Users.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found"});
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });
  const token=jwt.sign({id:user._id},JWT_SECRET_KEY,{expiresIn:"1d"});
  return res.status(200).json({ message: "Login successfully",token });
};
module.exports = { register, login };
