import React from 'react';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import socketIOClient from 'socket.io-client';
import MockedSocket from 'socket.io-mock';

import ContextProvider from './__test__/ContextProvider';
import App from './App';
import raceData from './__test__/mock/raceData';
import config from './config';

const { API_URL, API_ENDPOINT_FOR_REDUX } = config;

jest.mock('socket.io-client');

const server = setupServer(
  rest.get(`${API_URL}${API_ENDPOINT_FOR_REDUX}`, (req, res, ctx) => {
    return res(ctx.json([]));
  })
);

describe('Horse Racing App Tests', () => {
  let socket; // = new MockedSocket();

  beforeAll(() => server.listen());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  beforeEach(() => {
    socket = new MockedSocket();
    socketIOClient.mockReturnValue(socket);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    server.resetHandlers();
  });

  test('Renders Heading', async () => {
    render(
      <ContextProvider>
        <App />
      </ContextProvider>
    );

    await screen.findByRole('heading');

    expect(screen.getByRole('heading')).toHaveTextContent('HORSE RACING');
  });

  it('should dispatch connect event', async () => {
    /*
    socket should connect in App and 
    Note that the url should be dummy string 
    for test environment e.g.(const socket = io('', options);)
    */

    // let socket = new MockedSocket();

    render(
      <ContextProvider>
        <App />
      </ContextProvider>
    );

    await waitFor(() => {
      // console.log(socketIOClient.connect, socketIOClient.io);
      expect(socketIOClient.connect).toHaveBeenCalled();
      // socket.on('connect', function (message) {
      //   expect(message).to.equal('Hello World!');
    });
    // socket.socketClient.emit('connect', 'Hsdggaello World!');
    // expect(socketIOClient.connect).toHaveBeenCalled();
    // });
  });

  test.skip('Renders Navigation', async () => {
    render(
      <ContextProvider>
        <App />
      </ContextProvider>
    );

    await screen.findByText(raceData[0].name);

    expect(screen.getByText(raceData[0].name)).toBeTruthy();

    // expect(linkElement).toBeInTheDocument();
    // expect(screen.getByRole('button')).toBeDisabled();
  });

  //   fireEvent.click(screen.getByText("APPOINTMENTS"));

  //   await waitFor(() => screen.getByRole("heading"));
});
