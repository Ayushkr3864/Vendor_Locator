const User = require("../../models/UserDB");
const bcrypt = require("bcrypt")
const userRegister = async (req, res) => {
  try {
      const { name, email, password, phone, } = req.body;
      console.log(req.body);
       console.log("REQ FILE:", req.file);
      
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password,salt)
    //  Create user
    const user = await User.create({
      name,
      email,
      password:hash, // hashed by pre-save hook
        phone,
      avatar:req.file?.path
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("User register error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = userRegister;
