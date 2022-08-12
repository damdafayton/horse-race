module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(png|jpg|webp|ttf|woff|woff2|svg|mp4|gif)$':
      '<rootDir>/src/__test__/mock/reactMocks.js',
    'react-redux': require.resolve('react-redux'),
  },
  testEnvironment: 'jest-environment-jsdom-fifteen',
  testMatch: ['**/*.test.+(ts|tsx|js)', '!**/test_helpers'],
  moduleDirectories: ['node_modules', './src/__test__/'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    './src/__test__/setupServer.js',
  ],
};
