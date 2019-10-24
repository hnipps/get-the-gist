import { awaitStream } from "../../testing-utils/await-stream";
import { loginCode$, login } from "./login";
import expectExport from "expect";

const EXPECTED_CODE = "example-code";
const MOCK_URL = `http://example.com/oauth?code=${EXPECTED_CODE}`;

// Mock Chrome global
global.chrome = {
  identity: {
    launchWebAuthFlow: (_, callback) => {
      callback(MOCK_URL);
    },
    getRedirectURL: () => "http://example.com/redirect"
  }
};

describe("login", () => {
  it("should get an oauth code", async () => {
    await awaitStream(
      loginCode$,
      code => expectExport(code).toEqual(EXPECTED_CODE),
      login
    );
  });
});
