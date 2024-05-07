import Product from '../models/products.js'
const getAllProduct = async () => {
    try {
        const products = await Product.find().exec();
        return products;
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default {
    getAllProduct
}