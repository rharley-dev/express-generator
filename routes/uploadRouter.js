const express = require('express');
const authenticate = require('../authenticate');
const multer = require('multer'); // ability to process multipart/form-data

// customizing multer diskStorage and imageFileFilter
const storage = multer.diskStorage({
  // cb = callback function
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // (errors, destination path)
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname); // (errors, name of the file on server will be same as on client side)
  },
});

const imageFileFilter = (req, file, cb) => {
  // regx extention to look for these extentions
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('You can upload only image files!'), false); // second arg for multer to reject file if false
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

const uploadRouter = express.Router();

uploadRouter
  .route('/')
  .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
  })
  .post(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    upload.single('imageFile'),
    (req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(req.file);
    }
  )
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      res.statusCode = 403;
      res.end('DELETE operation not supported on /imageUpload');
    }
  );

module.exports = uploadRouter;
