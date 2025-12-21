import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    teamName: {
      type: String,
      required: false,
    },
    teamNumber: {
      type: String,
      required: false,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    transactionUid: {
      type: String,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    paymentScreenshotUrl: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
