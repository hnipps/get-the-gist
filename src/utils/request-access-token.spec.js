import "isomorphic-fetch";

import { requestAccessToken, accessToken$ } from "./request-access-token";
import { awaitStream } from "../../testing-utils/await-stream";

// Mock environment variables
jest.mock("./constants", () => ({
  CLIENT_ID: "test-id",
  CLIENT_SECRET: "test-secret"
}));

// Test params
const ACCESS_TOKEN = "access-granted";
const CODE = "test-code";
const REDIRECT_URI = "http://my-redirect.com";

// Mock Fetch
const mockJson = jest.fn();
mockJson.mockResolvedValue({ access_token: ACCESS_TOKEN });
global.fetch = jest.fn();
global.fetch.mockResolvedValue({ json: mockJson });

describe("requestAccessToken", () => {
  it("should return an access token", async () => {
    const expectedFetchData = {
      method: "POST",
      headers: new Headers({ Accept: "application/json" })
    };
    const expectedRedirectUri = "http%3A%2F%2Fmy-redirect.com";

    await awaitStream(
      accessToken$,
      accessToken => {
        expect(global.fetch.mock.calls).toEqual([
          [
            `https://github.com/login/oauth/access_token?client_id=test-id&client_secret=test-secret&code=${CODE}&redirect_uri=${expectedRedirectUri}`,
            expectedFetchData
          ]
        ]);
        expect(accessToken).toEqual(ACCESS_TOKEN);
      },
      () => requestAccessToken(CODE, REDIRECT_URI)
    );
  });
});
