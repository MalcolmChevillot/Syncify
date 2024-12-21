import { Request, Response, RequestHandler } from "express";
import { prisma } from "../utils/prisma";

export const getUserBySpotifyId: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send("Unauthorized");
    return;
  }

  const spotifyId = req.params.spotifyId as string;

  const user = await prisma.user.findUnique({
    where: { spotifyId },
  });

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  res.json(user);
};
