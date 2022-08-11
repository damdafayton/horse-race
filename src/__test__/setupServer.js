// src/setupTests.js
import { server } from './mock/server.js';
// Establish API mocking before all tests.
beforeEach(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterEach(() => server.close());
