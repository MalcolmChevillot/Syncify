import { Router } from "express";
import { addFriend, getFriends } from "../controllers/friendController";
import { authenticateJWT } from "../middleware/authMiddleware";
const friendRouter = Router();

friendRouter.post("/add/:friendId", authenticateJWT, addFriend);
friendRouter.get("/", authenticateJWT, getFriends);

export default friendRouter;
