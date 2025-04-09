import { Router } from "express";
import authController from "../controller/authController.js";
import { validateRequest } from "../middleware/validatorMiddleware.js";
import { loginSchema } from "../schemas/authSchemas.js";



const router = Router();

router.post('/clientlogin', validateRequest(loginSchema), authController.clientLogin);
router.post('/generate-credentials', authController.generateCredentials);




export default router;