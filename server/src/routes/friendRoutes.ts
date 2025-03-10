import { Router } from "express";
import { addFriend } from "../controllers/friendController";
const friendRouter = Router();

friendRouter.post("/add", addFriend);

export default friendRouter;
