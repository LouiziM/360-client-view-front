import { Grid, Box, Typography } from '@mui/material';
import bagIcon from './assets/bag.png';
import dollaSignIcon from './assets/dollasign.png';
import handoutIcon from './assets/handout.png';

const FinancialData = ({ theme }) => {
  
  const data = [
    { label: "Chiffre d’Affaires", value: "$500K", icon: bagIcon },
    { label: "Solde", value: "$200K", icon: dollaSignIcon },
    { label: "Crédit Autorisé", value: "$400K", icon: handoutIcon }
  ];

  return (
    <Grid container rowSpacing={1} xs={12} sm={12} md={12} lg={6} xl={12} style={{ borderRadius: '15px' }}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box
          marginBottom="20px"
          mt="20px"   
          p="20px"
          style={{ borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }} 
          backgroundColor={theme.palette.primary.main}
        >
          <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary.light} >
                    Informations financières
                </Typography>
                <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary.light}>
                      Type : Comptant
                </Typography>
           </Box>

          <hr style={{ border: '1px solid #ccc', width: '100%' }} />
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" height="24.5vh">
            {data.map(({ label, value, icon }, index) => (
              <Box key={index} display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="30%">
                <div style={{ width: '50%', paddingBottom: '56%', position: 'relative' }}>
                  <img src={icon} alt={label} style={{ width: '100%', height: '75%', position: 'absolute', top: 20, left: 0 }} />
                </div>
                <Typography mt="2vh"  variant="h2"  color={theme.palette.secondary.light} textAlign="center">
                  {value}
                </Typography>
                <Typography  variant="h6" fontWeight="bold"  textAlign="center">
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FinancialData;
