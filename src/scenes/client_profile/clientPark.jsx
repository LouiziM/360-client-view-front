import { Grid, Box, Typography, Card, CardContent, CircularProgress, Modal, useMediaQuery, Divider } from '@mui/material';
import dayjs from 'dayjs';
import NoDataLogo from '../../assets/No data.gif';
import { useEffect, useState } from 'react';
import { separateNumbersWithSpaces } from 'utils';
import { myAxios } from 'utils/Interceptor';
import ClientParkList from './clientParkList';

const ClientPark = ({ theme, clientSelected }) => {

  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const [isLoading, setIsLoading] = useState(false);
  const [parcClientData, setParcClientData] = useState([]);

  const [openModalParc, setOpenModalParc] = useState(false);
  const [detailParc, setDetailParc] = useState({});

  const closeDetailParc = () => setOpenModalParc(false);

  const viewDetailParc = (data) => {
    setOpenModalParc(true);
    setDetailParc(data);
  }

  const [page, setPage] = useState(1);

  const fetchParcClient = async (page) => {
    try {
      setIsLoading(true);
      const res = await myAxios.get(`/clients/parc-client/${clientSelected?.CUSTNO}?page=${page}&limit=10`);
      setParcClientData(prevItems => [...prevItems, ...res?.data?.data]);
      setIsLoading(false);
    } catch (error) {
      console.error(error?.response?.data?.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchParcClient(page);
  }, [page]);

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
        {/* {isLoading &&
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="500px"
          >
            <CircularProgress sx={{ color: theme.palette.blue.first }} />
          </Box>
        } */}
        {(parcClientData?.length > 0) &&
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
                      Commercial : <strong>{parcClientData[0]?.COMMERCIAL || '-'}</strong>
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
                      Dernier achat : <strong>{parcClientData[0]?.DATE_FACTURE ? dayjs(parcClientData[0]?.DATE_FACTURE).format("YYYY-MM-DD") : '-'}</strong>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        }
        {(parcClientData?.length > 0) &&
          <ClientParkList parcClientData={parcClientData} viewDetailParc={viewDetailParc} setPage={setPage} isLoading={isLoading} />
        }
        {parcClientData?.length === 0 &&
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

        <Modal
          open={openModalParc}
          onClose={closeDetailParc}
          aria-labelledby="modal-detail-parc-client"
          aria-describedby="modal-detail-parc-client-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isNonMobile ? 500 : 300,
            bgcolor: theme.palette.white.first,
            border: 'none',
            p: 4,
            maxHeight: "90%",
            overflow: "auto"
          }}>
            <Box display={"flex"} flexDirection={"column"} gap={3} justifyContent={"center"} alignItems={"center"}>
              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Marque
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailParc?.MARQUE || '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Version
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailParc?.VERSION || '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Modèle
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailParc?.MODELE || '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Famille
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailParc?.FAMILLE || '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Gamme
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailParc?.GAMME || '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Immatriculation
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailParc?.IMMATRICULATION || '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    VIN
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailParc?.VIN || '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Type d'achat
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailParc?.VN_VD_VO || '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Mode d'acquisition
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailParc?.TYPE_FINANCEMENT || '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Date d'achat
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailParc?.DATE_FACTURE ? dayjs(detailParc?.DATE_FACTURE).format('YYYY-MM-DD') : '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Site
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailParc?.SITE || '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Montant dépensé
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailParc?.CA === 0 ? '0 DH' : (detailParc?.CA ? separateNumbersWithSpaces(Math.round(detailParc?.CA)) + ' DH': '-')}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Carburant
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailParc?.CARBUR || '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Commercial
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailParc?.COMMERCIAL || '-'}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Grid>
  );
};

export default ClientPark;
