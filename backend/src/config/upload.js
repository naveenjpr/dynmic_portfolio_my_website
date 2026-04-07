const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio",
    resource_type: "auto", // 🔥 important for pdf
    allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf", "svg"],
  },
});

const upload = multer({ storage });

module.exports = upload;
