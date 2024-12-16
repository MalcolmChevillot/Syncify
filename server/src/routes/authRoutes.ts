import { Router } from "express";
import { exchangeCode } from "../controllers/authController";
const authRouter = Router();

authRouter.post("/exchange", exchangeCode);

export default authRouter;
