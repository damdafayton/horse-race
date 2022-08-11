import React from 'react';

import socketIOClient from 'socket.io-client';
import MockedSocket from 'socket.io-mock';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ContextProvider from './__test__/ContextProvider';
import App from './App';
import config from './config';

const { API_URL } = config;

jest.mock('socket.io-client');

// console.log(jsonCurrentUserLoggedOut);

describe('Render tests', () => {
  let socket;

  beforeEach(() => {
    socket = new MockedSocket();
    socketIOClient.mockReturnValue(socket);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Renders Home', async () => {
    render(
      <ContextProvider>
        <App />
      </ContextProvider>
    );

    // await screen.findByRole("navigation");
    await screen.findByRole('heading');

    expect(screen.getByRole('heading')).toHaveTextContent('HORSE RACING');
    // expect(screen.getByRole('button')).toBeDisabled();
  });

  test('Renders Navigation', async () => {
    render(
      <ContextProvider>
        <App />
      </ContextProvider>
    );

    await screen.findByText('LOGIN');

    expect(screen.getByText('LOGIN')).toBeTruthy();

    const linkElement = screen.getByText(/learn react./i);
    expect(linkElement).toBeInTheDocument();
    // expect(screen.getByRole('button')).toBeDisabled();
  });

  // test("Renders Appointments", async () => {
  //   const { getByText } = render(
  //     <ContextProvider>
  //       <App />
  //     </ContextProvider>
  //   );

  //   fireEvent.click(screen.getByText("APPOINTMENTS"));

  //   await waitFor(() => screen.getByRole("heading"));

  //   expect(
  //     getByText("Your existing appointments are listed below")
  //   ).toBeInTheDocument();
  // });
});
