import { SecuritySchema } from "../schema/index.js";
import CustomErrorHandler from "../service/CustomErrorHandler.js";
import moment from 'moment';

const tradeController = {
    async getsecurities(req, res, next) {
        try {

            // query params 
            // 0 - securities which are going to matured in one month
            // 1 - securities which are matured already

            // if no params then all securities

            const { maturity } = req.query;

            const currentDate = new Date();

            let filter = {};
            if (maturity === '0') {
                const oneMonthLater = new Date();
                // oneMonthLater.setMonth(currentDate.getMonth() + 1);

                filter.maturity_date = {
                    $gt: oneMonthLater.toISOString().split('T')[0] // Only YYYY-MM-DD part
                };
            } else if (maturity === '1') {
                filter.maturity_date = {
                    $lte: currentDate.toISOString().split('T')[0] // Only YYYY-MM-DD part
                };
            }

            const securities = await SecuritySchema.find(filter, 'security_id isin cusip issuer maturity_date coupon type facevalue');

            return res.status(200).json({ data: securities });

        } catch (err) {
            return res.status(500).json({ err, error: "Internal Server Error!" });
        }
    },
    async getsecuritiesbydates(req, res, next) {
        try {
            const { startDate, endDate } = req.query;

            let filter = {};

            if (startDate && endDate) {
                // Handle startDate and endDate filter
                filter.maturity_date = {
                    $gte: new Date(startDate).toISOString().split('T')[0],
                    $lte: new Date(endDate).toISOString().split('T')[0]
                };
            }

            console.log(filter);



            const securities = await SecuritySchema.find(filter, 'security_id isin cusip issuer maturity_date coupon type facevalue');

            return res.status(200).json({ data: securities });

        } catch (error) {
            return res.status(500).json({ err: error, erro: "Internal Server Error!" });
        }
    },
    async getsecuritybyid(req, res, next) {
        try {
            const { id } = req.query;

            const data = await SecuritySchema.findOne({ "security_id": id }, 'trades');

            return res.status(200).json({ data });


        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal Server Error!" })
        }
    },
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

            if(flag === 0){
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