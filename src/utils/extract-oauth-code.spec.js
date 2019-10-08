import { extractOAuthCode } from "./extract-oauth-code";

describe("extractOAuthCode", () => {
  it("should extract the oauth code", () => {
    const expectedCode = "test-oauth-code";
    const url = `http://example.com/oauth?code=${expectedCode}`;
    const code = extractOAuthCode(url);
    expect(code).toEqual(expectedCode);
  });
});
