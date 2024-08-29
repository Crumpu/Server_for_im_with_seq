const path = require("path");
// =============================
const multer = require("multer");
// =============================
const { staticPath } = require("../config/staticConfig");

const storageBrandImg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(staticPath, "images", "brands"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const filterBrandImage = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/gif"
  ) {
    return cb(null, true);
  }
  cb(null, false);
};

module.exports.uploadImages = multer({ storage: storageBrandImg,
   fileFilter: filterBrandImage,
 });
 