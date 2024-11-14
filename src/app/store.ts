import { configureStore } from '@reduxjs/toolkit';

import { searchReducer } from './slices/search-slice';
import { detailsReducer } from './slices/details-slice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    details: detailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
