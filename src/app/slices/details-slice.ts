import { createSlice } from '@reduxjs/toolkit';

import { TVShow } from '@/types';
import { RootState } from '@app/store';
import { getTVShow } from '@thunks/details-thunks';

interface DetailsState {
  tvShow?: TVShow;
  loading: number;
  error: boolean;
  imageLoaded: boolean;
}

const initialState: DetailsState = {
  loading: 0,
  error: false,
  imageLoaded: false,
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setImageLoaded: (state) => {
      state.imageLoaded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTVShow.pending, (state) => {
        state.loading++;
        state.error = false;
        state.imageLoaded = false;
      })
      .addCase(getTVShow.fulfilled, (state, { payload }) => {
        state.loading--;
        state.tvShow = payload;
      })
      .addCase(getTVShow.rejected, (state) => {
        state.loading--;
        state.error = true;
      });
  },
});

export const detailsReducer = detailsSlice.reducer;
export const { setImageLoaded } = detailsSlice.actions;

export const Selectors = {
  tvShow: (state: RootState) => state.details.tvShow,
  loading: (state: RootState) => state.details.loading,
  error: (state: RootState) => state.details.error,
  imageLoaded: (state: RootState) => state.details.imageLoaded,
};
