module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/app.js'],
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['**/src/*.spec.*'],
  globals: {
    testTimeout: 50000,
  },
  verbose: true,
  reporters: [
    "default",
    ["jest-html-reporters", {
      publicPath: "./reports/html-report",
      filename: "index.html",
      openReport: true
    }]
]
};
