import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TVShow } from '@/types';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { resetState, Selectors } from '@slices/search-slice';
import { searchTVShows } from '@thunks/search-thunks';

import {
  Autocomplete,
  Box,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';

const SearchBar = () => {
  const tvShows = useAppSelector(Selectors.tvShows);
  const loading = useAppSelector(Selectors.loading);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState('');

  useEffect(() => {
    const p = dispatch(searchTVShows(input));

    return () => {
      p.abort();
    };
  }, [dispatch, input]);

  const handleInputChange = async (inputValue: string) => {
    if (inputValue) {
      setInput(inputValue);
    } else {
      dispatch(resetState());
    }
  };

  const handleChange = (value: TVShow | null) => {
    if (value) {
      navigate(`/shows/${value.id}`);
    }
  };

  return (
    <Box sx={{ py: 2 }}>
      <Typography gutterBottom>Search for TV show:</Typography>
      <Autocomplete
        options={tvShows}
        filterOptions={(x) => x}
        getOptionLabel={(x) => x.name}
        getOptionKey={(x) => x.id}
        loading={!!loading}
        onInputChange={(_, inputValue) => handleInputChange(inputValue)}
        onChange={(_, value) => {
          handleChange(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label='TV show'
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {loading ? (
                      <CircularProgress color='inherit' size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default SearchBar;
