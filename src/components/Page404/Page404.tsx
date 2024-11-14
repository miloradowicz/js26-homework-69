import { Box, Typography, Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: blue[200],
      }}
    >
      <Typography variant='h1' style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant='h6' style={{ color: 'white' }} gutterBottom>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant='contained' component={Link} to='/'>
        Back Home
      </Button>
    </Box>
  );
};

export default Page404;
