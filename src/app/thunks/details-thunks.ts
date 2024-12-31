import { createAsyncThunk } from '@reduxjs/toolkit';

import { TVShow } from '@/types';
import { api } from '@app/api';

type ApiTVShow = TVShow;

export const getTVShow = createAsyncThunk(
  'details/getTVShow',
  async (id: number, { signal }) => {
    const { data, status, statusText } = await api.get<ApiTVShow>(
      `shows/${id}`,
      { signal }
    );

    if (status !== 200) {
      throw new Error(statusText);
    }

    return {
      ...data,
    };
  }
);
