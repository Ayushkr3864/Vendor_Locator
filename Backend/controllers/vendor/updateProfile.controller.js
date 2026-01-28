const vendorDB = require("../../models/vendorDB");

const updateProfile = async (req, res) => {
  try {
    const updateFields = {};
    const { newEmail, newAddress, newPhone, newName } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (newEmail) updateFields.email = newEmail;
    if (newName) updateFields.name = newName;
    if (newAddress) updateFields.address = newAddress;
    if (newPhone) updateFields.phone = newPhone;

    if (req.file) {
      updateFields.vendorimg = req.file.path; // or Cloudinary URL
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
      });
    }

    const updatedVendor = await vendorDB.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true },
    );

    if (!updatedVendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedVendor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = updateProfile;
