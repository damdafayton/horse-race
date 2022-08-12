import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

import config from '../config';

const {
  API_URL,
  SOCKET_TICKER_MESSAGE,
  API_ENDPOINT_FOR_REDUX,
  API_URL_FOR_SOCKET,
  SOCKET_START_MESSAGE,
} = config;

export const dataApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    raceData: builder.query({
      query: () => API_ENDPOINT_FOR_REDUX,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // I commented but didnt delete console.logs for documentation purpose
        // console.log(`Making request for the first time in a while`);

        let socket;
        try {
          await cacheDataLoaded;
          // console.log('http server connected');

          socket = io(API_URL_FOR_SOCKET);

          socket.on('connect', () => {
            // console.log('socket connected');
            socket.emit(SOCKET_START_MESSAGE);
          });

          socket.on(SOCKET_TICKER_MESSAGE, (message) => {
            // console.log('ticker emitted');

            updateCachedData((draft) => {
              draft.push(message);
            });
          });
        } catch (error) {
          // console.log({ error });
        }
        await cacheEntryRemoved;

        socket.off();

        // console.log(`No component subscribed to the data for a while`);
      },
    }),
  }),
});

export const { useRaceDataQuery } = dataApi;
