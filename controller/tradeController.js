import { SecuritySchema, TradeSchema } from "../schema/index.js";
import CustomErrorHandler from "../service/CustomErrorHandler.js";
import { SALT_FACTOR } from "../config/index.js";
import bcrypt from "bcryptjs"

const tradeController = {
  async updatetradestatus(req, res, next) {
    try {
      const { securityId, tradeId, newStatus } = req.body;

      let security = await SecuritySchema.findOne({ "security_id": securityId });

      if (!security) {
        return res.status(404).json({ error: "No Security Found!" })
      }

      // console.log(security.trades);
      var flag = 0;
      console.log(tradeId);
      for (var i = 0; i < security.trades.length; i++) {
        console.log(security.trades[i]);
        console.log(security.trades[i]['id']);
        if (security.trades[i].id === tradeId) {

          flag = 1;
          // Update the status of the trade
          security.trades[i].status = newStatus;

          // Save the updated Security document
          await security.save();
        }
      }

      if (flag === 0) {
        return res.status(404).json({ error: 'Trade not found' });
      }

      return res.status(200).json({ message: "Trade Status Updated." });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error!" })
    }
  }
}
export default tradeController;