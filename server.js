import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDatabase from './connection/mongo.js';
import authRouter from './routes/auth.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: '*', // Allow all origins (update this to your frontend URL in production for security)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add a basic route for the root path
app.get("/", (req, res) => {
  res.send("Server is running!");
});

connectToDatabase();

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