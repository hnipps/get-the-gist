import { useState } from 'preact/hooks';

const Octokit = require('@octokit/rest');

export const useOctoKit = initialAccessToken => {
  const [accessToken, setAccessToken] = useState(initialAccessToken);
  const [octokit, setOctokit] = useState();
  const updateAccessToken = newAccessToken => {
    setAccessToken(newAccessToken);
    if (newAccessToken && newAccessToken !== accessToken) {
      const newOctokit = Octokit({
        auth: newAccessToken,
        userAgent: 'get-the-gist v1.0.0',
        log: console,
      });
      setOctokit(newOctokit);
    } else if (!newAccessToken) {
      setOctokit();
    }
  };
  return accessToken, updateAccessToken, octokit;
};
