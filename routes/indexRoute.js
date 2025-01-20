const express = require("express");
const router = express.Router();
const authMidddleWare = require("../middlewares/auth");
const upload = require("../config/multer.config");
const fileModel = require("../models/files.models");
const firebase = require("../config/firebase.config");

router.get('/',(req,res)=>{
  res.redirect('home');
});
router.get("/home", authMidddleWare, async (req, res) => {
  const userFiles = await fileModel.find({ user: req.user.userId });
  res.render("home", {
    files: userFiles,
    user: req.user.username
  });
});

router.post(
  "/upload",
  authMidddleWare,
  upload.single("file"),
  async (req, res) => {
    const newFile = await fileModel.create({
      path: req.file.path,
      originalName: req.file.originalname,
      user: req.user.userId,
    });

    res.redirect('home');
  }
);

router.get("/download/:path", authMidddleWare, async (req, res) => {
  const loggedInUserId = req.user.userId;
  const path = req.params.path;
  const file = await fileModel.findOne({
    user: loggedInUserId,
    path: path,
  });
  if (!file) {
    return res.status(404).json({
      message: "File not Found",
    });
  }

  const [signedUrl] = await firebase
    .storage()
    .bucket()
    .file(path)
    .getSignedUrl({
      action: "read",
      expires: Date.now() + 1000 * 60, // URL expires in 1 minute
    });

  res.redirect(signedUrl);
});

router.delete('/delete/:path', authMidddleWare, async (req, res) => {
  try {
      const loggedInUserId = req.user.userId;
      const path = req.params.path;

      // Check if the file exists in the database and belongs to the logged-in user
      const file = await fileModel.findOne({
          user: loggedInUserId,
          path: path
      });

      if (!file) {
          return res.status(404).json({
              message: "File not found or you do not have permission to delete it."
          });
      }

      // Delete the file from Firebase Storage
      await firebase.storage().bucket().file(path).delete();

      // Delete the file record from the database
      await fileModel.deleteOne({ _id: file._id });

      res.json({
          message: "File deleted successfully."
      });
  } catch (error) {
      console.error("Error deleting file:", error);
      res.status(500).json({
          message: "Error deleting file.",
          error: error.message
      });
  }
});

router.get('/logout',(req,res)=>{
  res.cookie("token", '');
  res.redirect('home')
})

module.exports = router;
