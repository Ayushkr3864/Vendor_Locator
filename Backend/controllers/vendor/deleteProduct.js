const productDB = require("../../models/ProductDB")

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId

    await productDB.findByIdAndDelete(productId)
    res.status(200).json({message:"product deleted successfully"})
    } catch (e) {
        res.status(500).json({message:e.message})
    }
}

module.exports = deleteProduct