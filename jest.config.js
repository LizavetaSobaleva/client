module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.less$": "jest-css-modules-transform",
      "^.+\\.svg$": "jest-transform-stub"
    },
    moduleNameMapper: {
      "\\.(css|less)$": "identity-obj-proxy",
      "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js"
    },
    transformIgnorePatterns: [
      "/node_modules/(?!axios)"
    ],
  };
  