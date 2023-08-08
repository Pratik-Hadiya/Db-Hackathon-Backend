import { UserSchema } from "../schema/index.js";
import CustomErrorHandler from "../service/CustomErrorHandler.js";
import { SALT_FACTOR } from "../config/index.js";
import bcrypt from "bcryptjs"


const loginController = {
    async login(req,res,next) {
        try{
            
            let {email, password, role} = req.body;
            const user = await UserSchema.fetchById({email: email});
            if(!user) return next(CustomErrorHandler.wrongCredential());

            const match = await bcrypt.compare(password,user.password);
            if(!match) return next(CustomErrorHandler.wrongCredential());

            // user.access_token = await JwtService.sign({_id:user._id});
            // user.refresh_token = await JwtService.sign({_id:user._id},"refresh");

            // const access_token = await JwtService.sign({_id:user._id});
            // user.access_token = access_token;

            // var refresh_token;
            // try {
            //     const r_t = await RefreshToken.fetchById({_id: user._id});
            //     console.log(`r_t = ${r_t}`);
            //     if(r_t === "al") {
            //         refresh_token = await JwtService.sign({_id:user._id},"refresh");
            //         user.refresh_token = refresh_token;
            //         console.log("New Generated");

            //         await RefreshTokenSchema.create({ _id:user._id, token: user.refresh_token });
                    
            //     } else { 
            //         refresh_token = r_t.token;
            //         console.log("already exist");
            //     }
            // } catch (error) {
            //     console.log("error generated");
            // }


            // old code -start
            // const refresh_token = await JwtService.sign({_id:user._id},"refresh");
            // user.refresh_token = refresh_token;

            // await RefreshTokenSchema.create({ _id:user._id, token: user.refresh_token });

            // old code - end

            // const iosBaseUrl = `${APP_URL}api/ios/${user._id}`;
            // const androidBaseUrl = `${APP_URL}api/android/${user._id}`;
            // const baseUrl = `${APP_URL}api/${user._id}`;

            var message = "User Login Successfully.";

            // res.json({user, token: refresh_token, message});

            res.status(200).json({ data: user, message });
        }catch(err){
            res.status(500).json({ error: "Internal Server Error!" });
        }
    },
    async register(req,res,next) {
        try{
            
            let {name, email, password, role} = req.body;

            const salt = await bcrypt.genSalt(parseInt(SALT_FACTOR));
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const document = await UserSchema.create({ name, email, password, role });
            // console.log(document);
            if (!document) return next(CustomErrorHandler.somethingwrong());

            var message = "User Registered Successfully.";

            // res.json({user, token: refresh_token, message});

            res.status(200).json({message });
        }catch(err){
            res.status(500).json({ error: "Internal Server Error!" });
        }
    },
}
export default loginController;