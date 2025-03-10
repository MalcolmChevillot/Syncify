import { Request, Response, RequestHandler } from "express";
import { prisma } from "../utils/prisma";

export const addFriend: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send("Unauthorized");
    return;
  }

  const { userId } = req.body;
  const { friendId } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  const friend = await prisma.user.findUnique({
    where: { id: friendId },
  });

  if (!friend) {
    res.status(404).send("Friend not found");
    return;
  }

  const friendship = await prisma.friend.create({
    data: {
      user: {
        connect: {
          spotifyId: userId,
        },
      },
      friend: {
        connect: {
          spotifyId: friendId,
        },
      },
    },
  });

  res.json(friendship);
};
