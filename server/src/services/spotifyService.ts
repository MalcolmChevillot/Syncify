import axios from "axios";
import { config } from "../config/env";

export async function getAuthorizationUrl(): Promise<string> {
  console.log(config.spotifyClientId);
  const scopes = "user-read-private user-read-email";
  const redirect_uri = encodeURIComponent(config.spotifyRedirectUri);
  return `https://accounts.spotify.com/authorize?client_id=${config.spotifyClientId}&response_type=code&redirect_uri=${redirect_uri}&scope=${scopes}`;
}

export async function exchangeCodeForToken(
  code: string,
  code_verifier: string
): Promise<{ access_token: string; refresh_token: string }> {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", config.spotifyRedirectUri);
  params.append("code_verifier", code_verifier);

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    params.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${config.spotifyClientId}:${config.spotifyClientSecret}`
          ).toString("base64"),
      },
    }
  );

  return {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token,
  };
}

export async function getUserProfile(
  access_token: string
): Promise<{ id: string; display_name?: string; profilePic?: string }> {
  const profileResponse = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data = profileResponse.data;
  const profilePic =
    data.images && data.images.length > 0 ? data.images[0].url : undefined;

  return {
    id: data.id,
    display_name: data.display_name,
    profilePic,
  };
}
