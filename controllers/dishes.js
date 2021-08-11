const createDish = (req, res) => {
  try {
    console.log(req.files);
    if (!req.files) {
      res.send({
        status: false,
        message: 'No files',
      });
    } else {
      const { picture } = req.files;
      console.log(picture);
      picture.mv('uploadImages/' + picture.name);
      // picture.mv('uploadImages/' + picture.md5 + '.jpg');

      res.send({
        status: true,
        message: 'File is uploaded',
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  createDish,
};
