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

    registrationType: {
      type: String,
      enum: ["solo", "team"],
      required: true,
    },

    // SOLO
    fullName: {
      type: String,
    },

    // TEAM
    teamName: {
      type: String,
    },

    teamLeader: {
      type: String,
    },

    teamMembers: {
      type: [String],
      default: [],
    },

    teamNumber: {
      type: String,
    },

    // COMMON
    collegeName: {
      type: String,
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

export default mongoose.model("Registration", registrationSchema);
