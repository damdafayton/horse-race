import React from 'react';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import socketIOClient from 'socket.io-client';
import MockedSocket from 'socket.io-mock';

import ContextProvider from './__test__/ContextProvider';
import App from './App';
import raceData from './__test__/mock/raceData';
import config from './config';

const { SOCKET_START_MESSAGE, SOCKET_TICKER_MESSAGE } = config;

jest.mock('socket.io-client');

describe('Horse Racing App Tests', () => {
  let socket;

  // MSW .close() doesnt work so I skip this test to be able to test sockets later
  beforeAll(() => {
    socket = new MockedSocket();
    socketIOClient.mockReturnValue(socket);

    socket.on(SOCKET_START_MESSAGE, function (message) {
      socket.socketClient.emit(SOCKET_TICKER_MESSAGE, raceData);
    });
  });

  beforeEach(() => {});

  afterAll(() => {
    jest.restoreAllMocks();
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

    render(
      <ContextProvider>
        <App />
      </ContextProvider>
    );

    await waitFor(() => {
      expect(socketIOClient.connect).toHaveBeenCalled();
    });
  });

  test('socket.io-mock works', async () => {
    render(
      <ContextProvider>
        <App />
      </ContextProvider>
    );

    await waitFor(() => {
      socket.on('fake-message', function (message) {
        expect(message).toMatch('started streaming');
      });
      socket.socketClient.emit('fake-message', 'started streaming');
    });
  });

  test('Renders horses', async () => {
    const { getByText } = render(
      <ContextProvider>
        <App />
      </ContextProvider>
    );

    await waitFor(() => {
      socket.on(SOCKET_TICKER_MESSAGE, function (message) {
        expect(getByText(raceData[0].name)).toBeInTheDocument();
      });

      socket.socketClient.emit(SOCKET_START_MESSAGE, 'started streaming');
    });
  });
});
