import mongoose from "mongoose";
const Schema = mongoose.Schema;

const counterpartySchema = new Schema({
    counterpartyid: { type: Number },
    counterpartyname: { type: String, trim: true },
}, {
    timestamps: true
});

export default mongoose.model('Counterparty', counterpartySchema, 'counterparty');