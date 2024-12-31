import { createAsyncThunk } from '@reduxjs/toolkit';

import { TVShow } from '@/types';
import { api } from '@app/api';

interface ApiTVShow {
  show: TVShow;
}

export const searchTVShows = createAsyncThunk(
  'search/searchTVShows',
  async (title: string, { signal }): Promise<TVShow[]> => {
    const { data, status, statusText } = await api.get<ApiTVShow[]>(
      'search/shows',
      {
        params: { q: title },
        signal,
      }
    );

    if (status !== 200) {
      throw new Error(statusText);
    }

    return data.map((x) => ({
      ...x.show,
    }));
  }
);
