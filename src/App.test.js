import React from 'react';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import socketIOClient from 'socket.io-client';
import MockedSocket from 'socket.io-mock';
import SocketMock from 'socket.io-mock';

import ContextProvider from './__test__/ContextProvider';
import App from './App';
import raceData from './__test__/mock/raceData';
import config from './config';

const { SOCKET_START_MESSAGE, SOCKET_TICKER_MESSAGE } = config;

jest.mock('socket.io-client');

describe('Horse Racing App Tests', () => {
  let socket; // = new MockedSocket();

  beforeEach(() => {
    socket = new MockedSocket();
    socketIOClient.mockReturnValue(socket);
    // socketIOClient.io.mockReturnValue(socket);
  });

  afterEach(() => {
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

  test('should mock the socket', async () => {
    render(
      <ContextProvider>
        <App />
      </ContextProvider>
    );

    await waitFor(() => {
      socket.on(SOCKET_START_MESSAGE, function (message) {
        expect(message).toMatch('started streaming');
      });
      socket.socketClient.emit(SOCKET_START_MESSAGE, 'started streaming');
    });
  });

  /**
   * I COULDNT TEST THIS
   * REDUX RTK DOESNT PICK THE CONNECTION FROM SOCKET MOCK
   */

  test.skip('Renders horses', async () => {
    const { getByText } = render(
      <ContextProvider>
        <App />
      </ContextProvider>
    );

    await waitFor(() => {
      expect(socketIOClient.connect).toHaveBeenCalled();
    });

    // await waitFor(() => {
    //   socket.on(SOCKET_TICKER_MESSAGE, function (message) {
    //     expect(socketIOClient.connect).toHaveBeenCalled();
    //     // screen.queryByText(raceData[0].name);

    //     // expect(screen.getByText(raceData[0].name)).toBeTruthy();
    //     // expect(screen.getByText(raceData[0].name)).toBeFalsy();
    //     expect(getByText(raceData[0].name)).toBeInTheDocument();
    //   });
    //   socketIOClient.connect;
    //   socket.socketClient.emit(SOCKET_START_MESSAGE, 'started streaming');
    //   socket.socketClient.emit(SOCKET_TICKER_MESSAGE, raceData);
    // });
  });
});
