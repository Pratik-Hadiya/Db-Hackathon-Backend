import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, trim: true, required: true, default: null },
    email: { type: String, trim: true, required: true, default: null },
    password: { type: String, trim: true, required: true, default: null },
    role: { type: String, trim: true },
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema, 'users');