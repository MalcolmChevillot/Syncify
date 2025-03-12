import { Request, Response, RequestHandler } from "express";
import { prisma } from "../utils/prisma";

export const addFriend: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authUserId = req.user?.id;
    if (!authUserId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const friendId = parseInt(req.params.friendId, 10);
    if (!friendId) {
      res.status(400).json({ error: "Missing friendId" });
      return;
    }

    if (authUserId === friendId) {
      res.status(400).json({ error: "Cannot add yourself as a friend" });
      return;
    }

    const friend = await prisma.user.findUnique({ where: { id: friendId } });
    if (!friend) {
      res.status(404).json({ error: "Friend not found" });
      return;
    }

    const existingFriendship = await prisma.friend.findUnique({
      where: {
        userId_friendId: {
          userId: authUserId,
          friendId: friendId,
        },
      },
    });
    if (existingFriendship) {
      res.status(400).json({ error: "Friendship already exists" });
      return;
    }

    const friendship = await prisma.friend.create({
      data: {
        user: { connect: { id: authUserId } },
        friend: { connect: { id: friendId } },
        status: "accepted",
      },
    });

    const point = await prisma.point.create({
      data: {
        user: { connect: { id: authUserId } },
        friend: { connect: { id: friendId } },
      },
    });

    res.json({ friendship, point });
    return;
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

export const getFriends: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authUserId = req.user?.id;
    if (!authUserId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const friendsRaw = await prisma.friend.findMany({
      where: {
        status: "accepted",
        OR: [{ userId: authUserId }, { friendId: authUserId }],
      },
      select: {
        userId: true,
        friendId: true,
        user: {
          select: {
            id: true,
            displayName: true,
            profilePic: true,
            points: {
              select: {
                points: true,
              },
            },
          },
        },
        friend: {
          select: {
            id: true,
            displayName: true,
            profilePic: true,
            points: {
              select: {
                points: true,
              },
            },
          },
        },
      },
    });

    const friends = friendsRaw.map((f) => {
      const friendObj = f.userId === authUserId ? f.friend : f.user;
      return {
        id: friendObj.id,
        displayName: friendObj.displayName,
        profilePic: friendObj.profilePic,
        points:
          friendObj.points && friendObj.points.length > 0
            ? friendObj.points[0].points
            : 0,
      };
    });

    res.json({ friends });
  } catch (error) {
    console.error("Error getting friends:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
