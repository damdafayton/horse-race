import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '../../config';

const { API_URL, API_ENDPOINT_FOR_REDUX } = config;
// This configures a request mocking server with the given request handlers.

export const server = setupServer(
  rest.get(`${API_URL}${API_ENDPOINT_FOR_REDUX}`, (req, res, ctx) => {
    return res(ctx.json([]));
  })
);
