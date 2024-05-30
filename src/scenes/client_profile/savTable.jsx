import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, frFR, gridClasses, GridLogicOperator, GridToolbarQuickFilter } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Grid, Box, Typography, CircularProgress, IconButton, Modal, useMediaQuery, Divider, Tooltip } from '@mui/material';
import { CustomTooltip } from './misc/customTooltip.tsx';
import { useGetPassageSAVQuery } from 'features/state/clientApiSlice.js';
import dayjs from 'dayjs';
import NoDataLogo from '../../assets/No data.gif';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { CustomTooltipIcon } from './misc/customTooltipIcon.tsx';

const ODD_OPACITY = 0.4;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.blue.second,
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.gray.second, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.gray.second,
        ODD_OPACITY,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.gray.second,
          ODD_OPACITY
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.gray.second,
            ODD_OPACITY
          ),
        },
      },
    },
  },
  [`& .${gridClasses.row}.odd`]: {
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.gray.second,
        ODD_OPACITY,
      ),
    },
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.gray.second, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    }
  },
}));

function QuickSearchToolbar() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={"#ffffff"}
      borderRadius="9px"
      border="1px solid"
      borderColor={"#004BAB"}
      p="0rem 0.5rem"
      width="100%"
      height="50px"
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(',')
            .map((value) => value.trim())
            .filter((value) => value !== '')
        }
        sx={{
          width: "100%",
          pb: 0,
          "& .MuiInputBase-root.MuiInput-root:before": {
            display: 'none'
          },
          "& .MuiInputBase-root.MuiInput-root:after": {
            display: 'none'
          }
        }}
      />

    </Box>
  );
}


export default function SavTable({ theme, clientSelected }) {

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { data: passageSav, isLoading } = useGetPassageSAVQuery(clientSelected?.CUSTNO);
  const [openModal, setOpenModal] = useState(false);
  const [detailSav, setDetailSav] = useState({});

  const closeDetail = () => setOpenModal(false);

  const viewDetail = (data) => {
    setOpenModal(true);
    setDetailSav(data);
  }

  const columns = [
    {
      field: 'DATE_CREATION_BL_OR',
      headerName: 'Date de visite',
      flex: 1,
      align: "center",
      renderCell: (params) => (
        <CustomTooltip title={params?.row?.DATE_CREATION_BL_OR ? dayjs(params?.row?.DATE_CREATION_BL_OR).format('YYYY-MM-DD') : '-'}>
          <Typography
            sx={{
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {params?.row?.DATE_CREATION_BL_OR ? dayjs(params?.row?.DATE_CREATION_BL_OR).format('YYYY-MM-DD') : '-'}
          </Typography>
        </CustomTooltip>
      ),
    },
    {
      field: 'CA',
      headerName: 'Montant dépensé',
      flex: 1,
      align: "center",
      renderCell: (params) => (
        <CustomTooltip title={params?.row?.CA ? params?.row?.CA + ' DH' : '-'}>
          <Typography
            sx={{
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {params?.row?.CA ? params?.row?.CA + ' DH' : '-'}
          </Typography>
        </CustomTooltip>
      ),
    },
    {
      field: 'satisfaction',
      headerName: 'Satisfaction',
      flex: 1,
      align: "center",
      renderCell: (params) => (
        <>
          {params?.row?.SENTIMENT ?
            <>
              {params?.row?.SENTIMENT?.toLowerCase() === ('Très Satisfait'?.toLowerCase()) &&
                <CustomTooltipIcon title={'Très Satisfait'} children={<SentimentVerySatisfiedIcon style={{ color: 'green' }} />} />
              }
              {params?.row?.SENTIMENT?.toLowerCase() === ('Satisfait'?.toLowerCase()) &&
                <CustomTooltipIcon title={'Satisfait'} children={<SentimentSatisfiedAltIcon style={{ color: 'green' }} />} />
              }
              {params?.row?.SENTIMENT?.toLowerCase() === ('Insatisfait'?.toLowerCase()) &&
                <CustomTooltipIcon title={'Insatisfait'} children={<SentimentDissatisfiedIcon style={{ color: 'red' }} />} />
              }
              {params?.row?.SENTIMENT?.toLowerCase() === ('Très Insatisfait'?.toLowerCase()) &&
                <CustomTooltipIcon title={'Très Insatisfait'} children={<SentimentVeryDissatisfiedIcon style={{ color: 'red' }} />} />
              }
            </>
            :
            <CustomTooltipIcon title={'Aucun retour'} children={<RemoveCircleIcon style={{ color: 'gray' }} />} />
          }
        </>
      )
    },
    {
      field: 'SITE',
      headerName: 'Site',
      flex: 1.5,
      align: "center",
      renderCell: (params) => (
        <CustomTooltip title={params?.row?.SITE || '-'}>
          <Typography
            sx={{
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {params?.row?.SITE || '-'}
          </Typography>
        </CustomTooltip>
      ),
    },
    {
      field: 'Détail',
      headerName: 'Détail',
      flex: 1,
      align: "center",
      renderCell: (params) => (
        <>
          <IconButton onClick={() => viewDetail(params?.row)}>
            <VisibilityIcon
              sx={{ color: theme.palette.blue.first }}
            />
          </IconButton>
        </>
      ),
    },
  ];


  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ borderRadius: '15px', display: "flex" }}>
      <Box
        width="100%"
        height="100%"
        p="20px"
        style={{ borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}
        backgroundColor={theme.palette.white.first}
      >
        <Typography variant="h5" fontWeight="bold" color={theme.palette.blue.first} gutterBottom>
          Passage SAV
        </Typography>
        <hr style={{ border: `1px solid ${theme.palette.blue.first}`, width: '100%', marginBottom: "20px" }} />
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
        {(!isLoading && passageSav?.data?.length > 0) &&
          <StripedDataGrid
            theme={theme}
            rows={passageSav?.data}
            columns={columns}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            sx={{
              '&, [class^=MuiDataGrid]': {
                borderBottom: 'none',
                borderRight: 'none',
                borderLeft: 'none',
                borderTop: 'none',

                '& .MuiDataGrid-main': {
                  flexGrow: 0
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: 'bold',
                },
              },
            }}
            initialState={{
              filter: {
                filterModel: {
                  items: [],
                  quickFilterLogicOperator: GridLogicOperator.Or,
                },
              },
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5]}
            slots={{ toolbar: QuickSearchToolbar }}
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
          />
        }
        {passageSav?.data.length === 0 &&
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
          open={openModal}
          onClose={closeDetail}
          aria-labelledby="modal-detail"
          aria-describedby="modal-detail-description"
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
                    Site
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailSav?.SITE || '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Type de facture
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailSav?.TYPE_FACTURE || '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Type de ligne
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailSav?.TYPE_LIGNE || '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Description
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailSav?.DESCRIPTION || '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Vendeur
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailSav?.VENDEUR || '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Marque
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailSav?.MARQUE || '-'}
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
                  {detailSav?.MODELE || '-'}
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
                  {detailSav?.VERSION || '-'}
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
                  {detailSav?.CA ? detailSav?.CA + ' DH' : '-'}
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', backgroundColor: theme.palette.blue.first, height: '0.5px' }} />

              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant='h5' color={theme.palette.blue.first} fontWeight={"bold"}>
                    Date de visite
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} color={theme.palette.blue.first} textAlign={"right"}>
                  {detailSav?.DATE_CREATION_BL_OR ? dayjs(detailSav?.DATE_CREATION_BL_OR).format('YYYY-MM-DD') : '-'}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Grid>
  );
}