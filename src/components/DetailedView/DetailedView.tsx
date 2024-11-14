import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

import { useAppDispatch, useAppSelector } from '@app/hooks';
import { Selectors } from '@slices/details-slice';
import { getTVShow } from '@thunks/details-thunks';

import { Box, LinearProgress, Typography } from '@mui/material';

const DetailedView = () => {
  const tvShow = useAppSelector(Selectors.tvShow);
  const loading = useAppSelector(Selectors.loading);

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const fetchData = useCallback(
    async (id: string) => {
      const _id = Number.parseInt(id);

      await dispatch(getTVShow(_id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id, fetchData]);

  return (
    <Box sx={{ py: 1 }}>
      {loading ? (
        <LinearProgress />
      ) : tvShow ? (
        <>
          <img src={tvShow.image.medium} alt={tvShow.name} />
          <Typography variant='h3'>{tvShow.name}</Typography>
          {tvShow.summary && (
            <Typography component='div'>{parse(tvShow.summary)}</Typography>
          )}
        </>
      ) : null}
    </Box>
  );
};

export default DetailedView;
