const { credential } = require("firebase-admin"); // Import credential from firebase-admin
const multer = require("multer");
const firebaseStorage = require("multer-firebase-storage");
const serviceAccount = require("../drive-26b38-firebase-adminsdk-fbsvc-3ee9f39330.json");

// Correct Firebase Storage configuration
const storage = firebaseStorage({
  credentials: credential.cert(serviceAccount),
  bucketName: "drive-26b38.firebasestorage.app",
  unique: true,
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
