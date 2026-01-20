const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "productImage",
      resource_type:"image"  
    },
})

const productUpload = multer({ storage });
module.exports = productUpload;

