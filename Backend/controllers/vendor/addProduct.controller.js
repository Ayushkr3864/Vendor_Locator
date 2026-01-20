const addProduct = async (req,res) => {
    try {
        const vendorId = req.user.id;
        console.log(vendorId);
        
    } catch (e) {
        res.status(500).json({message:e.message})
    }
}