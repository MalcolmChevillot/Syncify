import { Router } from "express";
import { getUserBySpotifyId } from "../controllers/userController";
const userRouter = Router();

userRouter.get("/:spotifyId", getUserBySpotifyId);

export default userRouter;
