import { Grid, Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import { useGetParcClientsQuery } from 'features/state/clientApiSlice';
import NoDataLogo from '../../assets/No data.gif';

const ClientPark = ({ theme, clientSelected }) => {

  const { data: parcClientData, isLoading,  } = useGetParcClientsQuery(clientSelected?.CUSTNO);

  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ display: "flex" }}>
      <Box
        p="20px"
        height={"100%"}
        width={"100%"}
        style={{ borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}
        backgroundColor={theme.palette.white.first}
      >
        <Typography variant="h5" fontWeight="bold" color={theme.palette.blue.first} gutterBottom>
          Parc client
        </Typography>
        <hr style={{ border: `1px solid ${theme.palette.blue.first}`, width: '100%' }} />
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
        {(!isLoading && parcClientData?.data.length > 0) &&
          <>
            <Box mb="20px" mt="20px">
              <Grid container spacing={2}>
                <Grid item md={6} sm={12} xs={12}>
                  <Card sx={{
                    flexGrow: 1,
                    backgroundColor: theme.palette.blue.second,
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
                      <Typography style={{ fontWeight: 400, color: theme.palette.blue.first }}>
                        Commercial : <strong>{parcClientData?.dernierCommercial ? parcClientData?.dernierCommercial : '-'}</strong>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <Card sx={{
                    flexGrow: 1,
                    backgroundColor: theme.palette.blue.second,
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
                      <Typography style={{ fontWeight: 400, color: theme.palette.blue.first }}>
                        Dernier achat : <strong>{parcClientData?.dernierDateAchat ? dayjs(parcClientData?.dernierDateAchat).format("YYYY-MM-DD") : '-'}</strong>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            <Grid container spacing={0} sx={{
              overflowY: 'scroll',
              maxHeight: '340px',
              marginTop: '0',
            }}>
              {parcClientData?.data?.map((data, index) => (
                <Grid item md={12} sm={12} xs={12} key={index} sx={{
                  marginBottom: "20px",
                  "&:last-child": {
                    marginBottom: "0"
                  }
                }}>
                  <Card sx={{
                    backgroundColor: theme.palette.blue.second,
                    borderRadius: '10px',
                    boxShadow: 'none'
                  }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item md={4} sm={6} xs={12}>
                          <Typography variant="subtitle1" component="h3">
                            Marque
                          </Typography>
                          <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', color: theme.palette.blue.first }}>
                            {data?.MARQUE || '-'}
                          </Typography>
                        </Grid>

                        <Grid item md={4} sm={6} xs={12}>
                          <Typography variant="subtitle1" component="h3">
                            Version
                          </Typography>
                          <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', color: theme.palette.blue.first }}>
                            {data?.VERSION || '-'}
                          </Typography>
                        </Grid>

                        <Grid item md={4} sm={6} xs={12}>
                          <Typography variant="subtitle1" component="h3">
                            Modèle
                          </Typography>
                          <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', color: theme.palette.blue.first }}>
                            {data?.MODELE || '-'}
                          </Typography>
                        </Grid>

                        <Grid item md={4} sm={6} xs={12}>
                          <Typography variant="subtitle1" component="h3">
                            Mode Acquisition
                          </Typography>
                          <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', color: theme.palette.blue.first }}>
                            {data?.TYPE_FINANCEMENT || '-'}
                          </Typography>
                        </Grid>

                        <Grid item md={4} sm={6} xs={12}>
                          <Typography variant="subtitle1" component="h3">
                            Date d'achat
                          </Typography>
                          <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', color: theme.palette.blue.first }}>
                            {data?.DATE_FACTURE ? dayjs(data?.DATE_FACTURE).format('YYYY-MM-DD') : '-'}
                          </Typography>
                        </Grid>

                        <Grid item md={4} sm={6} xs={12}>
                          <Typography variant="subtitle1" component="h3">
                            Site
                          </Typography>
                          <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', color: theme.palette.blue.first }}>
                            {data?.SITE || '-'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        }
        {parcClientData?.data.length === 0 &&
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '88%'
            }}
          >
            <img 
              src={NoDataLogo} 
              alt='No data' 
              style={{
                width: '450px',
                height: '100%',
                objectFit: 'cover',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            />
          </Box>
        }
      </Box>
    </Grid>
  );
};

export default ClientPark;
