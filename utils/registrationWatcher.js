// const fetch = require("node-fetch"); // Node <18
import Registration from "../models/registrationSchema.js";
import dotenv from "dotenv";
dotenv.config();

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

function startRegistrationWatcher() {
  console.log("📡 Registration watcher started");

  Registration.watch([{ $match: { operationType: "insert" } }]).on(
    "change",
    async (change) => {
      try {
        const doc = change.fullDocument;

        const payload = {
          fullName: doc.fullName,
          collegeName: doc.collegeName,
          eventName: doc.eventName,
          contactNumber: doc.contactNumber || "",
          email: doc.userEmail || "",
          teamName: doc.teamName || "",
          registrationType: doc.registrationType || "",
          teamMembers: doc.teamMembers || [],
          teamNumber: doc.teamNumber || "",
          transactionUid: doc.transactionUid,
          paymentScreenshotUrl: doc.paymentScreenshotUrl,
          verified: doc.verified === true,
        };

        await fetch(`${APPS_SCRIPT_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        console.log("✅ Registration pushed to Google Sheet");
      } catch (err) {
        console.error("❌ Sheet sync failed:", err.message);
      }
    }
  );
}

export default startRegistrationWatcher;
