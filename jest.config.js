module.exports = {
  moduleNameMapper: {
    '\\.(css|scss|gif)$': 'identity-obj-proxy',
    'react-redux': require.resolve('react-redux'),
  },
  testEnvironment: 'jest-environment-jsdom-fifteen',
  testMatch: ['**/__test__/**/*.test.+(ts|tsx|js)', '!**/test_helpers'],
  moduleDirectories: ['node_modules', './src/__test__'],
};
