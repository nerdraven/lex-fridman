import axios from "axios";
import { URLSearchParams } from "url";

export abstract class CredentialProvider {
  abstract getAccessToken(): Promise<Record<string, string>>;
}

export class SpotifyClientCredentials extends CredentialProvider {
  private readonly oauth_token_url = "https://accounts.spotify.com/api/token";

  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string
  ) {
    super();
  }

  private makeAuthorizationHeader(): Record<string, string> {
    const tokens = Buffer.from(
      `${this.clientId}:${this.clientSecret}`
    ).toString("base64");
    return { Authorization: `Basic ` + tokens };
  }

  async getAccessToken(): Promise<Record<string, string>> {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
    }).toString();
    const res = (
      await axios.post(this.oauth_token_url, body, {
        headers: this.makeAuthorizationHeader(),
      })
    ).data;
    return res;
  }
}
