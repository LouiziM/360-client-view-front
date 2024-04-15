import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const ClientSatisfaction = ({ theme }) => {
  const satisfaction = 2; 
  const surveys = 10; 
  const complaints = 2; 

  const renderSatisfactionIcon = () => {
    let iconSize = '14rem'; 
    let iconMarginTop = '1rem'; 
    switch (satisfaction) {
      case 1:
        return <SentimentVeryDissatisfiedIcon style={{ fontSize: iconSize, color: '#00449C', marginTop: iconMarginTop }} />;
      case 2:
        return <SentimentDissatisfiedIcon style={{ fontSize: iconSize, color: '#00449C', marginTop: iconMarginTop }} />;
      case 3:
        return <SentimentNeutralIcon style={{ fontSize: iconSize, color: '#00449C', marginTop: iconMarginTop }} />;
      case 4:
        return <SentimentSatisfiedAltIcon  style={{ fontSize: iconSize, color: '#00449C', marginTop: iconMarginTop }} />;
      case 5:
        return <SentimentVerySatisfiedIcon  style={{ fontSize: iconSize, color: '#00449C', marginTop: iconMarginTop }} />;
      default:
        return null;
    }
  };
  

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < satisfaction; i++) {
      stars.push(<Star key={i} style={{ fontSize: '2.5rem', color: theme.palette.secondary.light }} />);
    }
    return stars;
  };

  return (
    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={{ borderRadius: '15px', display: "flex" }}>
      <Box
        width="100%"
        height="100%"
        p="20px"
        style={{ borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}
        backgroundColor={theme.palette.primary.white}
      >
        <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary.light} gutterBottom>
          Satisfaction
        </Typography>
        <hr style={{ border: `1px solid ${theme.palette.secondary.light}`, marginBottom: "20px" }} />
        <Grid container direction="column" height={"88%"}>
          <Box textAlign={"center"}>{renderSatisfactionIcon()}</Box>
          <Box display="flex" marginBottom="10px" marginTop="30px" justifyContent={"center"}>
            {renderStars()}
          </Box>
          <Box marginTop={"auto"} display="flex" justifyContent={"space-between"}>
            <Typography textAlign="center" fontWeight="bold" variant="h5" color={theme.palette.secondary.light}>Enquêtes: {surveys}</Typography>
            <Typography textAlign="center" fontWeight="bold" variant="h5" marginLeft="20px" color={theme.palette.secondary.light}>Réclamations: {complaints}</Typography>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default ClientSatisfaction;
