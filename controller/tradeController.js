import { SecuritySchema, TradeSchema } from "../schema/index.js";
import CustomErrorHandler from "../service/CustomErrorHandler.js";
import { SALT_FACTOR } from "../config/index.js";
import bcrypt from "bcryptjs"

const sampleData = [
    {
      tradeid: 1,
      bookid: "64d13cbb8238cab2cbaacb37", // Replace with a valid Book ObjectId
      counterpartyid: "64d13e3a8238cab2cbaacb3d", // Replace with a valid CounterParty ObjectId
      securityid: "611e5c651234567890abcddf", // Replace with a valid Security ObjectId
      quantity: 100,
      status: "Success",
      price: 150.5,
      buy_sell: "Buy",
      trade_date: new Date("2023-08-01"),
      settlement_date: new Date("2023-08-05"),
    },
    {
      tradeid: 2,
      bookid: "64d13cbb8238cab2cbaacb37", // Replace with a valid Book ObjectId
      counterpartyid: "64d13ea28238cab2cbaacb3f", // Replace with a valid CounterParty ObjectId
      securityid: "611e5c651234567890abcddf", // Replace with a valid Security ObjectId
      quantity: 50,
      status: "Pending",
      price: 200.25,
      buy_sell: "Buy",
      trade_date: new Date("2023-08-02"),
      settlement_date: null, // Settlement date is not yet defined for pending trades
    },
    {
      tradeid: 3,
      bookid: "64d13cbb8238cab2cbaacb37", // Replace with a valid Book ObjectId
      counterpartyid: "64d13ebd8238cab2cbaacb40", // Replace with a valid CounterParty ObjectId
      securityid: "611e5c651234567890abcdfe", // Replace with a valid Security ObjectId
      quantity: 75,
      status: "Success",
      price: 180.0,
      buy_sell: "Sell",
      trade_date: new Date("2023-08-03"),
      settlement_date: new Date("2023-08-06"),
    },
    // Add more sample data here...
  ];


const tradeController = {
    async insertdata(req,res,next) {
        try{
            
            const createdRecords = await TradeSchema.create(sampleData);
            console.log('Inserted records:', createdRecords);

            res.status(200).json({message: "done!" });
        }catch(err){
            res.status(500).json({ error: "Internal Server Error!" });
        }
    },
}
export default tradeController;