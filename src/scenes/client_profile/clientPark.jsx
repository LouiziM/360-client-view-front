import { Grid, Box, Typography, Card, CardContent } from '@mui/material';

const ClientPark = ({ theme }) => {
  const clientData = [
    { marque: 'Ford', version: 'EcoSport', modele: 'SUV', modeAcquisition: 'Achat', dateAchat: '11-10-2010', site: 'Dealer XYZ' },
    { marque: 'Toyota', version: 'Corolla', modele: 'Sedan', modeAcquisition: 'Leasing', dateAchat: '05-05-2015', site: 'Dealer ABC' },
    { marque: 'Honda', version: 'Civic', modele: 'Hatchback', modeAcquisition: 'Achat', dateAchat: '08-08-2018', site: 'Dealer PQR' },
    { marque: 'Chevrolet', version: 'Camaro', modele: 'Coupe', modeAcquisition: 'Achat', dateAchat: '02-02-2019', site: 'Dealer XYZ' },
    { marque: 'BMW', version: 'X5', modele: 'SUV', modeAcquisition: 'Leasing', dateAchat: '15-03-2020', site: 'Dealer ABC' },
  ];

  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ display: "flex" }}>
      <Box
        p="20px"
        height={"100%"}
        style={{ borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}
        backgroundColor={theme.palette.primary.white}
      >
        <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary.light} gutterBottom>
          Parc client
        </Typography>
        <hr style={{ border: `1px solid ${theme.palette.secondary.light}`, width: '100%' }} />
        <Box mb="20px" mt="20px" display="flex" justifyContent="space-between" gap={2}>
          <Card sx={{
            flexGrow: 1,
            width: "45%",
            backgroundColor: theme.palette.secondary.faint,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: 'none'
          }}>
            <CardContent sx={{
              width: '100%',
              textAlign: 'center',
              paddingBottom: '16px !important'
            }}>
              <Typography style={{ fontWeight: 600 }}>
                Commercial: Mr. Prénom Nom
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ 
            flexGrow: 1, 
            backgroundColor: theme.palette.secondary.faint, 
            borderRadius: '10px', 
            display: 'flex', 
            alignItems: 'center',
            boxShadow: 'none'
          }}>
            <CardContent sx={{
              width: '100%',
              textAlign: 'center',
              paddingBottom: '16px !important'
            }}>
              <Typography style={{ fontWeight: 600 }}>
                Dernier achat: 19-11-2007
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Grid container spacing={0} sx={{
          overflowY: 'scroll',
          maxHeight: '340px',
          marginTop: '0',
        }}>
          {clientData?.map((data, index) => (
            <Grid item xs={12} key={index} sx={{
              marginBottom: "20px",
              "&:last-child": {
                marginBottom: "0"
              }
            }}>
              <Card sx={{ 
                backgroundColor: theme.palette.secondary.faint, 
                borderRadius: '10px',
                boxShadow: 'none'
              }}>
                <CardContent>
                  <Grid container spacing={2}>
                    {Object.entries(data).map(([key, value]) => (
                      <Grid item xs={4} key={key}>
                        <Typography variant="subtitle1" component="h3">
                          {`${key.charAt(0).toUpperCase()}${key.slice(1)}:`}
                        </Typography>
                        <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', color: theme.palette.secondary.light }}>
                          {value}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default ClientPark;
