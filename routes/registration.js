<<<<<<< HEAD
import express from "express";
import multer from "multer";
import authenticateUser from "../middleware/authMiddleware.js";
import Registration from "../models/registrationSchema.js";
import emailSignup from "../models/userSchema.js";
import { uploadToAzureBlob } from "../utils/azureStorage.js";
=======
import express from 'express';
import multer from 'multer';
import authenticateUser from '../middleware/authMiddleware.js';
import Registration from '../models/registrationSchema.js';
import emailSignup from '../models/userSchema.js';
import { uploadToAzureBlob } from '../utils/azureStorage.js';
>>>>>>> a429e514bdbeb6638ff8fc0b79fc97743f5cd090

const registrationRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

<<<<<<< HEAD
registrationRouter.post(
  "/",
  authenticateUser,
  upload.single("paymentScreenshot"),
  async (req, res) => {
    try {
      const {
        fullName,
        collegeName,
        teamName,
        teamNumber,
        contactNumber,
        transactionUid,
        eventName,
      } = req.body;

      console.log(req.body);

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "Payment screenshot is required." });
      }

      // Required fields check
      if (!contactNumber || !transactionUid || !eventName) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required." });
      }

      // Find user to associate registration
      const user = await emailSignup.findOne({ email: req.user.email });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const screenshotUrl = await uploadToAzureBlob(req.file);

      const newRegistration = await Registration.create({
        userId: user._id,
        userEmail: user.email,
        fullName,
        eventName,
        collegeName,
        teamName,
        teamNumber,
        contactNumber,
        transactionUid,
        paymentScreenshotUrl: screenshotUrl,
      });

      res.status(201).json({
        success: true,
        message: "Registration successful",
        data: newRegistration,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
=======
registrationRouter.post('/', authenticateUser, upload.single('paymentScreenshot'), async (req, res) => {
    try {
        const { teamName, teamMembers, teamLeader, transactionUid, eventName, registrationType, fullName, collegeName } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Payment screenshot is required.' });
        }

        // Common required fields
        if (!transactionUid || !eventName || !collegeName) {
            return res.status(400).json({ success: false, message: 'Transaction ID, Event Name, and College Name are required.' });
        }

        let newRegistrationData = {
            transactionUid,
            eventName,
            collegeName
        };

        if (registrationType === 'team') {
            if (!teamName || !teamLeader || !teamMembers) {
                return res.status(400).json({ success: false, message: 'Team Name, Team Leader, and Team Members are required for team registration.' });
            }
            // Parse teamMembers if it comes as a stringified JSON (common in multipart/form-data)
            let parsedTeamMembers = teamMembers;
            try {
                if (typeof teamMembers === 'string') {
                    parsedTeamMembers = JSON.parse(teamMembers);
                }
            } catch (e) {
                // If parse fails, assume it's just a string or already in correct format if array
                // If it's a comma separated string, we might want to split it, but let's assume client sends JSON array string or Array
                if (typeof teamMembers === 'string') parsedTeamMembers = [teamMembers];
            }

            if (!Array.isArray(parsedTeamMembers)) {
                parsedTeamMembers = [parsedTeamMembers];
            }

            newRegistrationData = {
                ...newRegistrationData,
                registrationType: 'team',
                teamName,
                teamLeader,
                teamMembers: parsedTeamMembers,
                teamNumber: String(parsedTeamMembers.length)
            };
        } else {
            // Solo Registration
            if (!fullName) {
                return res.status(400).json({ success: false, message: 'Full Name is required for solo registration.' });
            }
            newRegistrationData = {
                ...newRegistrationData,
                registrationType: 'solo',
                fullName,
                teamNumber: '1' // Default for solo
            };
        }

        // Find user to associate registration
        const user = await emailSignup.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const screenshotUrl = await uploadToAzureBlob(req.file);

        const newRegistration = await Registration.create({
            userId: user._id,
            ...newRegistrationData,
            paymentScreenshotUrl: screenshotUrl
        });

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: newRegistration
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});
>>>>>>> a429e514bdbeb6638ff8fc0b79fc97743f5cd090

export default registrationRouter;
