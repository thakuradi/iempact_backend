import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = Buffer.from(process.env.SECRET_KEY, "hex");         

export function encrypt(text) {
  const iv = crypto.randomBytes(16); // exactly 16 bytes
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    iv: iv.toString("hex"),
    content: encrypted
  };
}


export function decrypt(encryptedObj) {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    SECRET_KEY,
    Buffer.from(encryptedObj.iv, "hex")
  );

  let decrypted = decipher.update(encryptedObj.content, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
