import User from "../models/user.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, "thdscskjcnksnckjsndcksncsdlc", { expiresIn: "3d" });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return  res.status(401).json({ message: "Incorrect password" });

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token, name: user.name, isAdmin: user.isAdmin,_id:user._id });
  } catch (error) {
    res.json({ message: "Invalid email or password" });
  }
};

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(401).json({ message: "User already exists" });
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hash, isAdmin: true, cart: [] });
    await user.save();

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token, name: user.name });
  } catch (error) {
    res.json({ message: error.message });
  }
};
