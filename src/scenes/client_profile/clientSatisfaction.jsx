import React from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import { Star } from '@mui/icons-material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useGetSatisfactionQuery } from 'features/state/clientApiSlice';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const ClientSatisfaction = ({ theme, clientSelected }) => {
  const { data: Satisfaction, isLoading } = useGetSatisfactionQuery(clientSelected?.CUSTNO);

  const satisfaction = Satisfaction?.data?.SCORE;
  const surveys = Satisfaction?.enquetes === 0 ? 0 : (Satisfaction?.enquetes || '-');
  const complaints = Satisfaction?.reclamations === 0 ? 0 : (Satisfaction?.reclamations || '-');

  let iconSize = '14rem';
  let iconMarginTop = '1rem';

  const renderSatisfactionIcon = () => {
    switch (satisfaction) {
      case 0:
        return <SentimentVeryDissatisfiedIcon style={{ fontSize: iconSize, color: theme.palette.blue.first, marginTop: iconMarginTop }} />;
      case 1:
        return <SentimentDissatisfiedIcon style={{ fontSize: iconSize, color: theme.palette.blue.first, marginTop: iconMarginTop }} />;
      // case 3:
      //   return <SentimentNeutralIcon style={{ fontSize: iconSize, color: theme.palette.blue.first, marginTop: iconMarginTop }} />;
      case 2:
        return <SentimentSatisfiedAltIcon style={{ fontSize: iconSize, color: theme.palette.blue.first, marginTop: iconMarginTop }} />;
      case 3:
        return <SentimentVerySatisfiedIcon style={{ fontSize: iconSize, color: theme.palette.blue.first, marginTop: iconMarginTop }} />;
      default:
        return null;
    }
  };


  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < satisfaction; i++) {
      stars.push(<Star key={i} style={{ fontSize: '2.5rem', color: theme.palette.blue.first }} />);
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
        backgroundColor={theme.palette.white.first}
      >
        <Typography variant="h5" fontWeight="bold" color={theme.palette.blue.first} gutterBottom>
          Satisfaction
        </Typography>
        <hr style={{ border: `1px solid ${theme.palette.blue.first}`, marginBottom: "20px" }} />
        {isLoading &&
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="500px"
          >
            <CircularProgress sx={{ color: theme.palette.blue.first }} />
          </Box>
        }
        <Grid container direction="column" height={"88%"}>
          <Box textAlign={"center"}>
            {satisfaction ? renderSatisfactionIcon() : <RemoveCircleIcon style={{ fontSize: iconSize, color: 'gray', marginTop: iconMarginTop }} />}
          </Box>
          <Box display="flex" marginBottom="10px" marginTop="30px" justifyContent={"center"}>
            {satisfaction ? renderStars() : <Typography textAlign="center" variant="h4" color={theme.palette.blue.first}>Aucun retour</Typography>}
          </Box>
          <Box marginTop={"auto"} display="flex" justifyContent={"space-between"}>
            <Typography textAlign="center" fontWeight="bold" variant="h5" color={theme.palette.blue.first}>Enquêtes: {surveys}</Typography>
            <Typography textAlign="center" fontWeight="bold" variant="h5" marginLeft="20px" color={theme.palette.blue.first}>Réclamations: {complaints}</Typography>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default ClientSatisfaction;
