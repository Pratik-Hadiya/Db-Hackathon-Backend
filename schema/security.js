import mongoose from "mongoose";
const Schema = mongoose.Schema;


const tradingSchema = new mongoose.Schema({
    id: String,
    counter_party_name: String,
    security_id: String,
    price: {
      value: Number,
      unit: String
    },
    date: String,
    status: String
  });

  const securitySchema = new mongoose.Schema({
    // id: String,
    security_id: String,
    isin: String,
    cusip: String,
    issuer: {
      name: String,
      industry: String
    },
    maturity_date: String,
    coupon: {
      rate: Number,
      unit: String
    },
    type: [String],
    facevalue: {
      value: Number,
      unit: String
    },
    trades: [tradingSchema]
  });

export default mongoose.model('Security', securitySchema, 'security');


// const securitySchema = new Schema({
//     securityid: { type: Number },
//     ISIN: { type: String, required: true },
//     CUSIP: { type: String, required: true },
//     Issuer: { type: String, required: true },
//     maturity_date: { type: Date },
//     status: { type: String, enum: ['Matured', 'Unmatured'], required: true },
//     coupon_rate: { type: Number },
//     coupon_type: { type: String },
//     type: { type: String },
//     facevalue: { type: Number },
// }, {
//     timestamps: true
// });