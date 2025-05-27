import { Router } from "express";
import { loginFunction } from "../controllers/authController";

const router = Router();

router.post('/login',loginFunction)


export default router;