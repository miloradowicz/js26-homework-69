import { createSlice } from '@reduxjs/toolkit';

import { TVShow } from '@/types';
import { RootState } from '@app/store';
import { searchTVShows } from '@thunks/search-thunks';

interface SearchState {
  tvShows: TVShow[];
  loading: boolean;
  error: boolean;
}

const initialState: SearchState = {
  tvShows: [],
  loading: false,
  error: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchTVShows.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(searchTVShows.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.tvShows = payload;
      })
      .addCase(searchTVShows.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const searchReducer = searchSlice.reducer;

export const Selectors = {
  tvShows: (state: RootState) => state.search.tvShows,
  loading: (state: RootState) => state.search.loading,
  error: (state: RootState) => state.search.error,
};
