import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
    tradeid: { type: Number },
    bookid: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    counterpartyid: { type: mongoose.Schema.Types.ObjectId, ref: 'CounterParty', required: true },
    securityid: { type: mongoose.Schema.Types.ObjectId, ref: 'Security', required: true },
    quantity: { type: Number },
    status: { type: String, enum: ['Success', 'Pending', 'Failed'], required: true },
    price: { type: Number },
    buy_sell: { type: String, enum: ['Buy', 'Sell'], required: true },
    trade_date: { type: Date },
    settlement_date: { type: Date },
}, {
    timestamps: true
});

export default mongoose.model('Trade', tradeSchema, 'trades');