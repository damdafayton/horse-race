import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

import config from '../config';

const { API_URL, SOCKET_MESSAGE_FOR_HORSES, REDUX_TRIGGER } = config;

export const dataApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    raceData: builder.query({
      query: () => REDUX_TRIGGER,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        console.log(`Making request for the first time in a while`);
        try {
          await cacheDataLoaded;
          const socket = io(API_URL);

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
        console.log(
          `No component subscribed to the data for the last 60 seconds`
        );
        // CLOSE THE SOCKET !
      },
    }),
  }),
});

export const { useRaceDataQuery } = dataApi;
