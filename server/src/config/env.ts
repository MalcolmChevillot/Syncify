import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID!,
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
  spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI!,
  jwtSecret: process.env.JWT_SECRET!,
};
