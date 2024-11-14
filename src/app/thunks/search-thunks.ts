import { createAsyncThunk } from '@reduxjs/toolkit';

import { TVShow } from '@/types';
import { api } from '@app/api';

interface ApiTVShow {
  show: TVShow;
}

let controller: AbortController;

export const searchTVShows = createAsyncThunk(
  'search/searchTVShows',
  async (title: string): Promise<TVShow[]> => {
    if (controller) {
      controller.abort();
    }
    controller = new AbortController();

    const { data, status, statusText } = await api.get<ApiTVShow[]>(
      'search/shows',
      {
        params: { q: title },
        signal: controller?.signal,
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
