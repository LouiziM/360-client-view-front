import React, {useRef } from 'react';
import { Box, Typography } from '@mui/material'; 
import { styled } from '@mui/system'; 


const Legend = ({dataColors, setDataColors, maxDataFloor }) => {
  const flickerInProgress = useRef(false);


  
  const step = maxDataFloor / 10;
  const legendValues = Array.from({ length: 10 }, (_, i) => step + i * step);

  const flickerColor = (index) => {
    if (flickerInProgress.current) return;
    flickerInProgress.current = true;
    const flickerColors = [...dataColors];
    flickerColors[index] = '#ffffff'; 
    setDataColors(flickerColors);
    setTimeout(() => {
      setDataColors(dataColors); 
      flickerInProgress.current = false; 
    }, 500);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="16vw"
      height="1vh"
      sx={{ position: 'relative', top: 330, right: 40 }} 
    >
      {legendValues.map((value, index) => (
        <LegendItem
          key={index}
          onClick={() => flickerColor(index)} 
        >
          <Box
            width="18px"
            height="18px"
            borderRadius="50%"
            backgroundColor={dataColors[index]}
            marginRight="5px"
            marginBottom="2px"
          />
          <Typography variant="body2">
            <strong>&lt;</strong> {value}
          </Typography>
        </LegendItem>
      ))}
      <LegendItem
        onClick={() => flickerColor(10)} 
      >
        <Box
          width="18px"
          height="18px"
          borderRadius="50%"
          backgroundColor={dataColors[10]} 
          marginRight="5px"
          marginBottom="2px"
        />
        <Typography variant="body2">
          <strong>&gt;</strong> {legendValues[9]} 
        </Typography>
      </LegendItem>
    </Box>
  );
};

const LegendItem = styled(Box)({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default Legend;
