<<<<<<< HEAD
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./connection/mongo.js";
import authRouter from "./routes/auth.js";
import mongoose from "mongoose";
=======
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDatabase from './connection/mongo.js';
import authRouter from './routes/auth.js';
>>>>>>> a429e514bdbeb6638ff8fc0b79fc97743f5cd090

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
<<<<<<< HEAD
app.use(
  cors({
    origin: "*", // Allow all origins (update this to your frontend URL in production for security)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
=======
app.use(cors({
  origin: '*', // Allow all origins (update this to your frontend URL in production for security)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
>>>>>>> a429e514bdbeb6638ff8fc0b79fc97743f5cd090

// Add a basic route for the root path
app.get("/", (req, res) => {
  res.send("Server is running!");
});

connectToDatabase();

<<<<<<< HEAD
import registrationRouter from "./routes/registration.js";
import profileRouter from "./routes/profile.js";
import adminRouter from "./routes/admin.js";

app.use("/auth", authRouter);
app.use("/registration", registrationRouter);
app.use("/profile", profileRouter);
app.use("/admin", adminRouter);

import startRegistrationWatcher from "./utils/registrationWatcher.js";

mongoose.connection.once("open", () => {
  startRegistrationWatcher();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
=======
import registrationRouter from './routes/registration.js';
import profileRouter from './routes/profile.js';
import adminRouter from './routes/admin.js';

app.use('/auth', authRouter);
app.use('/registration', registrationRouter);
app.use('/profile', profileRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
>>>>>>> a429e514bdbeb6638ff8fc0b79fc97743f5cd090
