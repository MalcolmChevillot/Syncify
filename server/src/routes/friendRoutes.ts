import { Router } from "express";
import { addFriend } from "../controllers/friendController";
import { authenticateJWT } from "../middleware/authMiddleware";
const friendRouter = Router();

friendRouter.post("/add/:friendId", authenticateJWT, addFriend);

export default friendRouter;
