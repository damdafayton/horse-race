// src/setupTests.js
import { server } from './mock/server.js';
// Establish API mocking before all tests.
beforeEach(() => {
  server.listen();
  // server.close();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  server.close();
});

// Clean up after the tests are finished.
// afterAll(() => server.close());
