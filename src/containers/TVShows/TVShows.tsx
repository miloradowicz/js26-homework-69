import { Outlet } from 'react-router-dom';

import { Container, Stack } from '@mui/material';
import SearchBar from '@components/SearchBar/SearchBar';

const TVShows = () => {
  return (
    <>
      <Container>
        <Stack>
          <SearchBar />
          <Outlet />
        </Stack>
      </Container>
    </>
  );
};

export default TVShows;
