const cloudinary = require("../config/cloudinary")
const { CloudinaryStorage } = require("multer-storage-cloudinary")

const multer = require("multer")

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "userImage",
        resource_type:"image"
    }
})

const upload = multer({ storage })
module.exports = upload