import express from "express";
import { loginController, tradeController, securityController } from "../controller/index.js";
const router = express.Router();



router.post("/login",loginController.login);
router.post("/register",loginController.register);
router.post("/fakedata", tradeController.insertdata);
router.get("/getsecurities", securityController.getsecurities);
router.get("/getsecuritiesbydates", securityController.getsecuritiesbydates);
router.get("/getsecuritybyid", securityController.getsecuritybyid);
router.put("/updatetradestatus", securityController.updatetradestatus);

// router.get("/update", securityController.update);

export default router;