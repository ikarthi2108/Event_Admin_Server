const path = require('path');
const fs = require('fs');

// Serve uploaded images
exports.getImage = (req, res) => {
  const imagePath = path.join(__dirname, '../uploads', req.params.filename);
  
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({
      success: false,
      error: 'Image not found'
    });
  }
};