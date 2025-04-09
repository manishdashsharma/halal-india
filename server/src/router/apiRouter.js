import { Router } from 'express'
import apiController from '../controller/apiController.js'
import clientRouter from '../router/clientRouter.js';
import authRouter from '../router/authRouter.js';
import uploadRouter from '../router/uploadRouter.js';

const router = Router()

router.route('/self').get(apiController.self);
router.route('/health').get(apiController.health);
router.use('/client', clientRouter);
router.use('/auth', authRouter);
router.use('/upload', uploadRouter);

export default router