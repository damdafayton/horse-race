const configuration = {
  API_URL: 'http://localhost:3002/',
  SOCKET_MESSAGE_FOR_HORSES: 'ticker',
  REDUX_TRIGGER: 'api',
  MAX_DISTANCE: process.env.NODE_ENV === 'production' ? 1000 : 100,
};

export default configuration;
