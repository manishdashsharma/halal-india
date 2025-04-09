import { Router } from "express";
import clientController from '../controller/clientController.js';
import {validateRequest} from '../middleware/validatorMiddleware.js';
import { clientCompanyDetailsSchema, clientCompanyDirectorSchema } from '../schemas/clientSchemas.js';
import authentication from "../middleware/authentication.js";

const router = Router();

router.use(authentication);

router.post('/createCompanyDetails', validateRequest(clientCompanyDetailsSchema), clientController.createCompanyDetails);

router.post('/createDirectorDetails', validateRequest(clientCompanyDirectorSchema), clientController.createDirectorDetails);

router.post('/signAgreement', clientController.signAgreement);

export default router;