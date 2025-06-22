export default {
  testEnvironment: "node",
  testMatch: ["**/src/__test__/index.test.mjs"],
  transform: {},
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testTimeout: 30000,
};
