import config from "../config/config.js";
import { prisma } from "../config/prisma.js";
import bcrypt from 'bcrypt';
import httpError from "../util/httpError.js";
import quicker from "../util/quicker.js";
import httpResponse from "../util/httpResponse.js";
import responseMessage from "../constant/responseMessage.js";


export default {
    generateCredentials: async (req, res, next) => {

        try {
            const {
                name,
                email,
                phone
            } = req.body;
            console.log(req.body);
            

            const rawPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(rawPassword, 10);
    
            await prisma.client.create({
                data: {
                    name,
                    email: email ? email : null,
                    phone: phone ? phone : null,
                    password: hashedPassword
                }
            })
            
            return httpResponse(req, res, 201, responseMessage.SUCCESS, {rawPassword});
            
        } catch (error) {
            console.error("Error in generating credentials.", error);
            httpError(next, error, req, 500)
            
        }
    },
    clientLogin: async (req, res, next) => {
        try {
            const {
                email,
                phone,
                password,
            } = req.body;

            console.log(req.body);
            

            const user = await prisma.client.findFirst({
                where: {
                    OR: [
                        ...(email ? [{ email }] : []),
                        ...(phone ? [{ phone }] : [])
                    ]
                }
            });

            if(!user) {
                return httpError(next, new Error("User not found."), req, 404);
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return httpError(next, new Error("Unauthorized."), req, 403);

            const accessToken = quicker.generateToken(
                {
                    userId: user.id
                },
                config.ACCESS_TOKEN.SECRET,
                config.ACCESS_TOKEN.EXPIRY
            )

            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                accessToken
            });
            
        } catch (error) {
            console.error("Error while client login.", error);
            httpError(next, error, req, 500);
            
        }
    }
}