const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "shopImage",
      resource:"image"  
    },
})

const shopUpload = multer({ storage });
module.exports = shopUpload;

