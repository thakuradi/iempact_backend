import express from "express";
import multer from "multer";
import authenticateUser from "../middleware/authMiddleware.js";
import Registration from "../models/registrationSchema.js";
import emailSignup from "../models/userSchema.js";
import { uploadToAzureBlob } from "../utils/azureStorage.js";

const registrationRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

registrationRouter.post(
  "/",
  authenticateUser,
  upload.single("paymentScreenshot"),
  async (req, res) => {
    try {
      const { teamName, teamNumber, contactNumber, transactionUid, eventName } =
        req.body;

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "Payment screenshot is required." });
      }

      // Required fields check
      if (
        !teamName ||
        !teamNumber ||
        !contactNumber ||
        !transactionUid ||
        !eventName
      ) {
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
        teamName,
        teamNumber,
        contactNumber,
        transactionUid,
        eventName,
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

export default registrationRouter;
