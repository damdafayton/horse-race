import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

import config from '../config';

const {
  API_URL,
  SOCKET_MESSAGE_FOR_HORSES,
  API_ENDPOINT_FOR_REDUX,
  API_URL_FOR_SOCKET,
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
        console.log(`Making request for the first time in a while`);
        let socket;
        try {
          await cacheDataLoaded;
          socket = io(API_URL_FOR_SOCKET);
          console.log('connected');
          socket.on('connect', (connectMessage) => {
            socket.emit('start');
            console.log({ connectMessage });
          });

          socket.on(SOCKET_MESSAGE_FOR_HORSES, (message) => {
            updateCachedData((draft) => {
              draft.push(message);
            });
          });
        } catch (error) {
          console.log({ error });
        }
        await cacheEntryRemoved;

        socket.off();

        console.log(`No component subscribed to the data for a while`);
      },
    }),
  }),
});

export const { useRaceDataQuery } = dataApi;
