const bcrypt = require("bcrypt")
const vendorModel = require("../../models/vendorDB")
const vendorRegister = async (req, res) => {
    const { email, phone, password, name, city, lat, lng, } = req.body;
    const vendorimg = req.file?.path;
    console.log("REQ BODY:", req.body);
  console.log("REQ FILE:", req.file);
  if (!email || !password || !phone || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

    try {
        const vendorExisted = await vendorModel.findOne({ email, })
        console.log(vendorExisted);
        
        if (vendorExisted) {
           return res.status(400).json({message:"Please login already registered"})
        }
         if (!lat || !lng) {
           return res.status(400).json({
             message: "Location is required",
           });
         }
        const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const vendorCreated = await vendorModel.create({
      email,
      name,
      password: hashPassword,
      phone,
      city,
      location: {
        type: "Point",
        coordinates: [Number(lng), Number(lat)],
      },
      vendorimg,
    });
    res.status(200).json({message:"registered successfully",vendorCreated})
    } catch (e) {
        res.status(500).json({messgae:e.message})
}
}

module.exports = vendorRegister;