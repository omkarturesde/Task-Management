import { Box, Button, Typography } from '@mui/material';
import pageNotFoundImg from '../../assets/pageNotFound.svg';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../utils/hooks/useLocalStorage';
import { path } from '../../routes/Path';
import { useEffect } from 'react';
const PageNotFound = () => {
  const navigate = useNavigate();
  const { isTokenValid } = useLocalStorage();

  useEffect(() => {
    setTimeout(() => {
      navigate(path.HOME);
    }, 4000);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <img src={pageNotFoundImg} width={'800px'} alt='pageNotFound' />
        <Typography variant='h4' sx={{ mt: 2 }}>
          THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST
        </Typography>
        <Typography variant='h6' sx={{ mt: 2 }}>
          Please go back to the homepage or try a different search.
        </Typography>
        <Button
          variant='contained'
          sx={{ color: '#ffffff', mt: 4 }}
          color='secondary'
          onClick={() => {
            navigate(isTokenValid ? '/' : path.LOGIN);
          }}
        >
          Go to homepage
        </Button>
        <p style={{ color: '#FF0000' }}>Please wait while Redirecting....</p>
      </Box>
    </>
  );
};

export default PageNotFound;
