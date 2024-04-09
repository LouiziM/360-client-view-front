import React, { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material'; 
import { styled } from '@mui/system'; 

const defaultColors = [
  '#E3F2FD', // lightest shade of blue
  '#BBDEFB',
  '#90CAF9',
  '#64B5F6',
  '#42A5F5',
  '#2196F3', // medium shade of blue
  '#1E88E5',
  '#1976D2',
  '#1565C0',
  '#0D47A1',
  '#0d2c5c' // darkest shade of blue
];

const Legend = ({dataColors, setDataColors, maxDataFloor }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const flickerInProgress = useRef(false);

  const handleLegendHover = (index) => {
    setHoveredIndex(index);
  };

  const resetColors = () => {
    setHoveredIndex(null);
  };

  
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
      onMouseLeave={resetColors}
      display="flex"
      flexDirection="column"
      width="16vw"
      height="1vh"
      sx={{ position: 'relative', top: 330, right: 40 }} 
    >
      {legendValues.map((value, index) => (
        <LegendItem
          key={index}
          onMouseEnter={() => handleLegendHover(index)}
          onMouseLeave={resetColors}
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
        onMouseEnter={() => handleLegendHover(10)}
        onMouseLeave={resetColors}
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
