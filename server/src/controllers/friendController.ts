import { Request, Response, RequestHandler } from "express";
import { prisma } from "../utils/prisma";

export const addFriend: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Récupération de l'ID de l'utilisateur authentifié depuis le middleware
    const authUserId = req.user?.id;
    if (!authUserId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Récupération du friendId depuis les paramètres de la route
    const friendId = parseInt(req.params.friendId, 10);
    if (!friendId) {
      res.status(400).json({ error: "Missing friendId" });
      return;
    }

    // Vérification que l'utilisateur ne tente pas de s'ajouter lui-même
    if (authUserId === friendId) {
      res.status(400).json({ error: "Cannot add yourself as a friend" });
      return;
    }

    // Vérifier l'existence de l'ami dans la DB
    const friend = await prisma.user.findUnique({ where: { id: friendId } });
    if (!friend) {
      res.status(404).json({ error: "Friend not found" });
      return;
    }

    // Vérifier si la relation existe déjà pour éviter les doublons
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

    // Créer la relation d'amitié
    const friendship = await prisma.friend.create({
      data: {
        user: { connect: { id: authUserId } },
        friend: { connect: { id: friendId } },
        status: "accepted",
      },
    });
    res.json(friendship);
    return;
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
