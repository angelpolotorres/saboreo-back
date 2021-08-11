const multer = require('multer');

const uploadImages = (req, res, next) => {
  multer({
    dest: '../src/public/uploadImages',
  }).single('image');
};
