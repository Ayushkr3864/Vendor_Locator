const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
require("dotenv").config();
const connectDB = require("./config/db")
const vendorRegister = require("./routes/vendor/vendorRegister.route")
const loginVendor = require("./routes/vendor/vendorLogin.route")
const vendorProfile = require("./routes/vendor/vendorProfile.route")
const Logout = require("./routes/vendor/Logout.route")
const Authenticate = require("./routes/vendor/Authenticate.route");
const updateProfile = require("./routes/vendor/updateProfile.route");
const addProduct = require("./routes/vendor/addProduct.route")
const fetchProduct = require("./routes/vendor/fetchProduct.route")
require("./config/cloudinary");
const cors = require("cors");
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
      origin: ["http://localhost:5173", "http://10.184.85.122:5173"],
      methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
      credentials:true
  })
);
connectDB();
app.get("/", (req, res) => {
    res.send("Vendor Locator API is running");
})
app.use("/api/vendor/register", vendorRegister)
app.use("/api/vendor/login", loginVendor)
app.use("/api/vendorProfile", vendorProfile)
app.use("/api/Logout", Logout)
app.use("/api/authenticate", Authenticate)
app.use("/api", updateProfile)
app.use("/api/addProduct", addProduct)
app.use("/api/vendor/products", fetchProduct);
app.listen(3000,()=>{console.log("Vendor Locator API is running at port 3000");
})