import mongoose, { Schema } from 'mongoose';

const adminSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phonenumber: { type: String, required: true, maxlength: 10 },
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
