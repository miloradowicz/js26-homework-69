import React from 'react';
import { useNavigate } from 'react-router-dom';

import { TVShow } from '@/types';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { Selectors } from '@slices/search-slice';
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

  const handleInputChange = async (inputValue: string) => {
    if (inputValue) {
      await dispatch(searchTVShows(inputValue));
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
        loading={loading}
        onInputChange={(_, inputValue) => handleInputChange(inputValue)}
        onChange={(_, value) => {
          handleChange(value);
        }}
        renderOption={(props, option) => {
          const { key: _key, ...optionProps } = props;

          return (
            <li key={option.id} {...optionProps}>
              {option.name}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label='TV show'
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color='inherit' size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
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
