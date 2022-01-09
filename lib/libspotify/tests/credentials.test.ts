import { SpotifyClientCredentials } from "../src/index";
const client_id = process.env.SPOTIFY_CLIENT_ID || "";
const client_secret = process.env.SPOTIFY_CLIENT_SECRET || "";

describe("Testing Spotify Client credentials", () => {
  test("should return the access tokens for client", async () => {
    const creds = new SpotifyClientCredentials(client_id, client_secret);
    const data = await creds.getAccessToken();
    const res = JSON.stringify(data);
    expect(res).toContain("access_token");
  });
});
