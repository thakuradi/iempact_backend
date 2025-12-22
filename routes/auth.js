import express from "express";
import emailSignup from "../models/userSchema.js";
import { encrypt, decrypt } from "../utils/passwordManager.js";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await emailSignup.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (decrypt(user.password) !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "5d",
    });

    user.token = token;
    await user.save();

    return res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const encryptedPassword = encrypt(password);
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "5d",
    });

    const newEntry = await emailSignup.create({
      email,
      password: encryptedPassword,
      token, // store token
    });
    res.status(201).json({
      success: true,
      data: newEntry,
      token,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

authRouter.get("/checkToken", (req, res) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ valid: false });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({ valid: false });
      }

      return res.json({ valid: true, decoded });
    });
  } catch (err) {
    res.json({ valid: false });
  }
});

export default authRouter;
