module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>config/test-setup.js"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/style-mock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/file-mock.js"
  }
};
