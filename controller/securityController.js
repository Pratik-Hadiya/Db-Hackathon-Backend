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

            var securities;

            let filter = {};
            if (maturity === '0') {
                const oneMonthLater = new Date();
                // oneMonthLater.setMonth(currentDate.getMonth() + 1);

                filter.maturity_date = {
                    $gt: oneMonthLater.toISOString().split('T')[0] // Only YYYY-MM-DD part
                };

                securities = await SecuritySchema.find(filter, 'security_id isin cusip issuer maturity_date coupon type facevalue trades').sort({ maturity_date: 1 });


            } else if (maturity === '1') {
                filter.maturity_date = {
                    $lte: currentDate.toISOString().split('T')[0] // Only YYYY-MM-DD part
                };

                securities = await SecuritySchema.find(filter, 'security_id isin cusip issuer maturity_date coupon type facevalue trades').sort({ maturity_date: 1 });
            }

            return res.status(200).json({ data: securities });

        } catch (err) {
            return res.status(500).json({ err, error: "Internal Server Error!" });
        }
    },
    async getsecuritiesbyfilter(req, res, next) {
        try {
            const { startDate, endDate, bondtype } = req.body;

            let filter = {};

            if (startDate !== "") {


                // Handle startDate and endDate filter


                filter.maturity_date = {
                    $gte: new Date(startDate).toISOString().split('T')[0],
                    $lte: new Date(endDate).toISOString().split('T')[0]
                };
            }

            if(bondtype === "") {

            } else if(bondtype === '0') {

            } else if (bondtype === '1') {
                filter.type = 'Callable Bond';
            } else if (bondtype === '2') {
                filter.type = 'Mortgage Bond';
            } else if (bondtype === '3') {
                filter.type = 'Traditional Bond';
            } else if (bondtype === '4') {
                filter.type = 'Fixed Rate Bond';
            }   

            // console.log(filter);



            const securities = await SecuritySchema.find(filter, 'security_id isin cusip issuer maturity_date coupon type facevalue trades').sort({ maturity_date: 1 });

            const currentDate = new Date();

            const maturedSecurities = securities.filter(security => security.maturity_date < currentDate.toISOString().split('T')[0]);
            const unmaturedSecurities = securities.filter(security => security.maturity_date >= currentDate.toISOString().split('T')[0]);


            return res.status(200).json({ matured: maturedSecurities, unmatured: unmaturedSecurities });

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
    }
}
export default tradeController;