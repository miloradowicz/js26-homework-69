import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

import { useAppDispatch, useAppSelector } from '@app/hooks';
import { Selectors } from '@slices/details-slice';
import { getTVShow } from '@thunks/details-thunks';

import { Box, Grid2 as Grid, LinearProgress, Typography } from '@mui/material';

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
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 5, md: 3 }}>
            <img src={tvShow.image.medium} alt={tvShow.name} />
          </Grid>
          <Grid size={{ xs: 12, sm: 7, md: 9 }}>
            <Typography variant='h3'>{tvShow.name}</Typography>
            {tvShow.summary && (
              <Typography component='div'>{parse(tvShow.summary)}</Typography>
            )}
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
};

export default DetailedView;
