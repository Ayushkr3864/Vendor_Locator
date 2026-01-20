const vendorDB = require("../../models/vendorDB");

const vendorProfile = async (req, res) => {
  try {
    const vendor = await vendorDB
      .findById( req.user.id )
          .select({ password: 0, __v: 0 });
      console.log(vendor);
      
    if (!vendor)
      return res
        .status(404)
        .json({ success: false, message: "please sign up" });
    res.status(200).json({ vendor: vendor, success: true });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};
module.exports = vendorProfile
