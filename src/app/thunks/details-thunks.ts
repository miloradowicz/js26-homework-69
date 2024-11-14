import { createAsyncThunk } from '@reduxjs/toolkit';

import { TVShow } from '@/types';
import { api } from '@app/api';

interface ApiTVShow {
  show: TVShow;
}

export const getTVShow = createAsyncThunk(
  'details/getTVShow',
  async (id: number) => {
    const { data, status, statusText } = await api.get<ApiTVShow>(
      `shows/${id}`
    );

    if (status !== 200) {
      throw new Error(statusText);
    }

    return {
      ...data.show,
    };
  }
);
