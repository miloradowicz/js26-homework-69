import { createAsyncThunk } from '@reduxjs/toolkit';

import { TVShow } from '@/types';
import { api } from '@app/api';

type ApiTVShow = TVShow;

let controller: AbortController;

export const getTVShow = createAsyncThunk(
  'details/getTVShow',
  async (id: number) => {
    if (controller) {
      controller.abort();
    }
    controller = new AbortController();

    const { data, status, statusText } = await api.get<ApiTVShow>(
      `shows/${id}`,
      { signal: controller?.signal }
    );

    if (status !== 200) {
      throw new Error(statusText);
    }

    return {
      ...data,
    };
  }
);
