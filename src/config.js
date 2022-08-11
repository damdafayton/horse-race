const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://horse-racing-server.herokuapp.com/'
    : 'http://localhost:3002/';

const configuration = {
  // Setup for mocking library
  API_URL: URL,
  API_ENDPOINT_FOR_REDUX: 'api',
  API_URL_FOR_SOCKET: process.env.NODE_ENV === 'test' ? '' : URL,
  SOCKET_MESSAGE_FOR_HORSES: 'ticker',
  MAX_DISTANCE: process.env.NODE_ENV === 'production' ? 1000 : 200,
};

export default configuration;
