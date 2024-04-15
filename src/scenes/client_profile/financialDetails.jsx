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
    <Grid item rowSpacing={1} xs={12} sm={12} md={6} lg={6} xl={6} sx={{ borderRadius: '15px', display: "flex" }}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box
          p="20px"
          height="100%"
          style={{ borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}
          backgroundColor={theme.palette.primary.white}
        >
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary.light} >
              Informations financières
            </Typography>
            <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary.light}>
              Type : <span style={{ fontWeight: "200" }}>Comptant</span>
            </Typography>
          </Box>

          <hr style={{ border: `1px solid ${theme.palette.secondary.light}`, width: '100%' }} />
          <Box display="flex" justifyContent="space-around" alignItems="center" flexWrap="wrap" m={"30px 0 10px 0"}>
            {data.map(({ label, value, icon }, index) => (
              <Box key={index} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <img src={icon} alt={label} style={{ maxWidth: "60px" }} />
                <Typography mt="2vh" fontSize={"24px"} fontWeight="bold" variant="h2" color={theme.palette.secondary.light} textAlign="center">
                  {value}
                </Typography>
                <Typography mt={"5px"} variant="h4" textAlign="center" fontSize={"16px"} fontWeight={"600"}>
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
