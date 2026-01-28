const vendorDB = require("../../models/vendorDB");
const registerBusiness = async (req, res) => {
  try {
    const vendorId = req.params.id;
    // console.log("Request File:", req.file);
    if (!vendorId) {
      return res.status(400).json({ message: "Vendor email is required" });
    }
    
    const { category, address, description, businessName } = req.body;
    console.log(req.body);
    const updatedVendor = await vendorDB.findByIdAndUpdate(
      vendorId,
      {
        category,
        address,
        description,
        isActive: true,
        isProfileComplete: true,
        shopImage: req.file?.path,
        businessName,
      },
      { new: true, runValidators: true },
    );
    console.log(updatedVendor);
    if (!updatedVendor)
      return res.status(404).json({ message: "vendor not found" });
    res.status(200).json({ updatedVendor: updatedVendor });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = registerBusiness;
