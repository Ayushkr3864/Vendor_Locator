const ProductDB = require("../../models/ProductDB");
const vendorDB = require("../../models/vendorDB");
const addProduct = async (req, res) => {
  try {
    const vendorId = req.user.id;
    console.log(vendorId);
    const { tag, available, price, productName } = req.body;
    console.log(req.body);
    if (!tag || !price || !productName) {
      return res.status(400).json({ message: "please fill all fields" });
    }
    const vendor = await vendorDB.findOne({ _id: vendorId });
    console.log(vendor);
    
    if (!vendor.isProfileComplete)
      return res
        .status(404)
        .json({ message: "please complete your profile first" });
    const product = await ProductDB.create({
      tag,
      available,
      price,
      productName,
      productImage: req.file?.path,
      vendorId,
    });
    res.status(200).json({ message: "product Created Successfully", product });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
module.exports = addProduct;
