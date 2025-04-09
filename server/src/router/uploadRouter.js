import { Router } from "express";
import authentication from "../middleware/authentication.js";
import uploadController from "../controller/uploadController.js";



const router = Router();

router.use(authentication);

router.get("/get-url", uploadController.url);

export default router;