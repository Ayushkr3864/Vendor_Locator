const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const vendorModel = require("../../models/vendorDB")
const cookie = require("cookies")
const jwtSecret = process.env.JWT_SECRET

const vendorLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    
    try {
        
        if(!email || !password) return res.status(401).json({message:"all fields required"})
    const vendor = await vendorModel.findOne({ email, })
    if (!vendor) {
        return res.status(401).json({ message: "User not registered" });
    }
    const ismatch = await bcrypt.compare(password, vendor.password);
    if (!ismatch) return res.status(401).json({ message: "invalid credentials" })
    const payload = { role: "vendor", id: vendor._id,email:vendor.email };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "2h" });
    res.cookie("Token", token, {
      maxAge: 24 * 60 * 60 * 1000, 
      httpOnly: true, 
      secure: true,
    });
    res.status(200).json({message:"login successful",isauthenticated:true})
    } catch (e) {
        res.status(500).json({ message: e.message, isauthenticated: false });
  }
}

module.exports = vendorLogin