// routes/uploadRoutes.js
const express = require('express');
const upload = require('../Middleware/upload');
const router = express.Router();


router.post('/', upload.single('image'), (req, res) => {
  try {
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({
      status: true,
      message: 'Image uploaded successfully',
      url: imageUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Upload failed' });
  }
});

module.exports = router;
