import mongoose, { Schema } from "mongoose";
const serviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});
const Service = mongoose.model("service", serviceSchema);
export default Service; 
