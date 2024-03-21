import React, { useState } from 'react';
import { Button, Drawer, Box ,useTheme } from '@mui/material';
import ClientCard from './clientCard';

const DrawerComponent = () => {

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Button variant="contained" onClick={toggleDrawer}>
          {open ? 'Close Drawer' : 'Open Drawer'}
        </Button>
      </Box>
      <Drawer
        variant="persistent"
        anchor="right"
        open={open}
        PaperProps={{
          style: {
            border: 'none',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            width: 'auto',
          },
        }}
      >
        
        <Box flex="1" overflow="auto" py={5.5} pl={4} sx={{ overflowY: 'scroll' }}>
          <ClientCard theme={theme} toggleDrawer={toggleDrawer} />
        </Box>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
