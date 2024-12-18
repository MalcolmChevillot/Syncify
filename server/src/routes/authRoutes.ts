import { Router } from "express";
import { exchangeCode, getMe } from "../controllers/authController";
const authRouter = Router();

authRouter.post("/exchange", exchangeCode);
authRouter.get("/me", getMe);

export default authRouter;
