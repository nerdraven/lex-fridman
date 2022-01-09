import { Axios } from "axios";
import { CredentialProvider } from "./credentials";

export default class Spotify {
  private readonly client: Axios;
  private readonly baseURL: string = "https://api.spotify.com/v1";

  constructor(private readonly credential: CredentialProvider) {
    this.client = new Axios({
      baseURL: this.baseURL,
    });
  }

  async initialize(): Promise<void> {
    const tokens = await this.credential.getAccessToken();
    this.client.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${tokens.access_token}`;
  }

  async getEpisodes(showId: string): Promise<unknown> {
    const res = await this.client.get(`/${showId}/episodes`)
    return res;
  }
}
