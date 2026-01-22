const vendorDB = require("../../models/vendorDB");
const productDB = require("../../models/ProductDB")
const vendorProfile = async (req, res) => {
  try {
    const vendor = await vendorDB
      .findById( req.user.id )
          .select({ password: 0, __v: 0 });
    console.log(vendor);
    const products = await productDB.countDocuments({vendorId:req.user.id})
    vendor.totalProduct = products
    if (!vendor)
      return res
        .status(404)
        .json({ success: false, message: "please sign up" });
    res.status(200).json({ vendor: vendor, success: true,totalProducts:products });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};
module.exports = vendorProfile
