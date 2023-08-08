import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: { type: String, trim: true, required: true, default: null },
    bookid: { type: Number },
    bookname: { type: String, trim: true },
}, {
    timestamps: true
});

export default mongoose.model('Book', bookSchema, 'books');