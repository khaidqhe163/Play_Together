import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    category: String
}, {
    timestamps: true
});

const Product = mongoose.model('products', productSchema);
export default Product