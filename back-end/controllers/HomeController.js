import { ProductService } from "../services/index.js"
const testHome = async(req, res) => {
    try {
        const product = await ProductService.getAllProduct();
        return res.status(200).json({
            message: "sucess",
            products: product
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed"
        })
    }
}

export default {
    testHome
}