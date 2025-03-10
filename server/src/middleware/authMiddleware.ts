import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

interface JwtPayload {
  id: number;
  spotifyId: string;
  // Ajoutez d'autres propriétés si nécessaire
}

// Étendre l'interface Request de Express pour inclure "user"
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Unauthorized: Missing token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err || !decoded) {
      res.status(403).json({ error: "Forbidden: Invalid token" });
      return;
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
