import { Router } from "express";
import { loginController, signUpController } from "../controllers/authController";

const router = Router();

router.post('/login',loginController)


export default router;