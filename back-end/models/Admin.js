import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phonenumber: { type: String, required: true, max: 10 },
});

const Admin = mongoose.model("admin", adminSchema);
export default adminSchema;
