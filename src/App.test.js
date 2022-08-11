import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ContextProvider from './__test__/ContextProvider';
import App from './App';
import config from './config';

const { API_URL } = config;

const server = setupServer(
  rest.get(API_URL, (req, res, ctx) => res(ctx.json([])))
);

// console.log(jsonCurrentUserLoggedOut);

describe('Render tests', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('Renders Home', async () => {
    render(
      <ContextProvider>
        <App />
      </ContextProvider>
    );

    // await screen.findByRole("navigation");
    await screen.findByRole('heading');

    expect(screen.getByRole('heading')).toHaveTextContent('RestandDate');
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
