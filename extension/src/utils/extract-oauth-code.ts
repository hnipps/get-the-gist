const queryString = require("query-string");

export const extractOAuthCode = (url: string) => {
  const {
    query: { code }
  } = queryString.parseUrl(url);
  return code;
};
