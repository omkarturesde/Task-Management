import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Box from '@mui/material/Box';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <Sidebar />

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          height: '100%',
          overflow: 'auto',
          backgroundColor: '#f9f9f9',
          padding: 2,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
