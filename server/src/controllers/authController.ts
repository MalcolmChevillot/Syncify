import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { prisma } from "../utils/prisma";
import {
  exchangeCodeForToken,
  getUserProfile,
} from "../services/spotifyService";

export const exchangeCode: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const code = req.body.code as string | undefined;
  const code_verifier = req.body.codeVerifier as string;

  if (!code) {
    res.status(400).send("Missing code");
    return;
  }

  try {
    const { access_token, refresh_token } = await exchangeCodeForToken(
      code,
      code_verifier
    );
    const spotifyUser = await getUserProfile(access_token);

    let user = await prisma.user.findUnique({
      where: { spotifyId: spotifyUser.id },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          spotifyId: spotifyUser.id,
          displayName: spotifyUser.display_name || undefined,
          profilePic: spotifyUser.profilePic,
        },
      });
    }

    const token = jwt.sign({ spotifyId: user.spotifyId }, config.jwtSecret, {
      expiresIn: "1h",
    });

    // Tu peux aussi stocker le refresh_token en DB si besoin
    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: { spotifyRefreshToken: refresh_token }
    // });

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'échange du code Spotify");
  }
};
