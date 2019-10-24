const queryString = require("query-string");

export const extractOAuthCode = url => {
  const {
    query: { code }
  } = queryString.parseUrl(url);
  return code;
};
