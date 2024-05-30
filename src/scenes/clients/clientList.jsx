import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import { useGetAllClientsQuery } from '../../features/state/clientApiSlice';
import { gridClasses } from '@mui/x-data-grid';
import SearchIcon from "@mui/icons-material/SearchOutlined";
import { useTheme } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import ClientCard from './clientCard';
import Drawer from '@mui/material/Drawer';
import CircularProgress from '@mui/material/CircularProgress';
import { frFR } from "@mui/x-data-grid/locales";
import { CustomTooltip } from 'scenes/client_profile/misc/customTooltip.tsx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useDebounce } from 'utils/debounceSearch';
import { useSelector } from 'react-redux';

dayjs.extend(utc);

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

const Clients = () => {
  const theme = useTheme();
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const [searchTerm, setSearchTerm] = React.useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
    total: 0,
    pageSizeOptions: [10, 25, 100]
  });

  const { data: clients = [], isLoading } = useGetAllClientsQuery({ ...paginationModel, searchTerm: debouncedSearchTerm });

  const handleChangeFilter = (e) => {
    setSearchTerm(e?.target?.value);
    setTimeout(() => {
      setPaginationModel({ ...paginationModel, page: 0 });
    }, 1000);
  };

  const handleChangePagination = (newPage) => {
    setPaginationModel({
      ...paginationModel,
      pageSize: newPage?.pageSize,
      page: newPage?.page
    })
  }
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const columns = [
    {
      field: 'CUSTNO',
      headerName: 'IDC',
      type: 'number',
      align: 'center',
      width: 150,
      renderCell: ({ row }) => (
        <CustomTooltip title={row?.CUSTNO ? row?.CUSTNO?.toString() : ''} />
      )
    },
    {
      field: 'NAME2',
      headerName: 'Nom',
      type: 'string',
      align: 'center',
      width: 150,
      renderCell: ({ row }) => (
        <CustomTooltip title={row?.NAME2 ? row?.NAME2 : ''} />
      )
    },
    {
      field: 'FIRSTNAME',
      headerName: 'Prénom',
      type: 'string',
      align: 'center',
      width: 150,
      renderCell: ({ row }) => (
        <CustomTooltip title={row?.FIRSTNAME ? row?.FIRSTNAME : ''} />
      )
    },
    {
      field: 'CITY',
      headerName: 'Ville',
      type: 'string',
      align: 'center',
      width: 150,
      renderCell: ({ row }) => (
        <CustomTooltip title={row?.CITY ? row?.CITY : ''} />
      )
    },
    {
      field: 'COUNTRY',
      headerName: 'Pays',
      type: 'string',
      align: 'center',
      width: 120,
      renderCell: ({ row }) => (
        <CustomTooltip title={row?.COUNTRY ? row?.COUNTRY : ''} />
      )
    },
    {
      field: 'DATECRE',
      headerName: 'Crée le',
      type: 'date',
      align: 'center',
      width: 180,
      valueGetter: (params) => new Date(params.value),
      renderCell: ({ row }) => (
        <CustomTooltip title={row?.DATECRE ? dayjs.utc(row?.DATECRE).format("YYYY-MM-DD à HH:mm:ss") : ''} />
      )
    },
    {
      field: 'PHONE',
      headerName: 'Tel',
      type: 'string',
      width: 300,
      align: 'center',
      renderCell: ({ row }) => (
        // <CustomTooltip title={(row?.PHONE ? row?.PHONE : '') + (row?.PHONE && row?.PHONEPRI ? ' / ' : '') + (row?.PHONEPRI ? row?.PHONEPRI : '')} />
        <CustomTooltip title={(row?.PHONE && row?.PHONEPRI) ? `${row?.PHONE} / ${row?.PHONEPRI}` : (row?.PHONE ? row?.PHONE : (row?.PHONEPRI ? row?.PHONEPRI : '-')) } />
      )
    },
    {
      field: 'ZIP',
      headerName: 'ZIP',
      type: 'number',
      width: 90,
      align: 'center',
      renderCell: ({ row }) => (
        <CustomTooltip title={row?.ZIP ? row?.ZIP?.toString() : ''} />
      )
    },
    {
      field: 'ADDRESS',
      headerName: 'Adresse',
      type: 'string',
      flex: 1,
      align: 'center',
      renderCell: ({ row }) => (
        <CustomTooltip title={row?.ADDRESS ? row?.ADDRESS : ''} />
      )
    },
  ];

  const handleRowClick = (params) => {
    const clickedRow = clients?.data?.find(client => client?.CUSTNO === params?.row?.CUSTNO);
    setSelectedRow(clickedRow || null);
    setOpen(true);
  };

  return (
    <>
      {(!isLoading) ?
        <Grid container p={5}>
          <Grid item md={4} sm={4} xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              id="search"
              name="search"
              value={searchTerm}
              onChange={handleChangeFilter}
              placeholder="Rechercher"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item lg={12} width={"100%"} mt={3}>
            <StripedDataGrid
              theme={theme}
              rows={clients?.data || []}
              columns={columns}
              getRowClassName={(params) =>
                params?.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
              }
              onRowClick={handleRowClick}
              getRowId={(row) => row.CUSTNO}
              localeText={frFR.components.MuiDataGrid.defaultProps.localeText}

              rowCount={clients?.totalClients}
              paginationMode="server"
              paginationModel={paginationModel}
              onPaginationModelChange={handleChangePagination}
              pageSizeOptions={paginationModel?.pageSizeOptions}

              sx={{
                '& .MuiDataGrid-root': {
                  border: 'none',
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: 'none',
                },
                '& .MuiDataGrid-columnHeaders': {
                  borderTop: `1px solid ${theme.palette.gray.third}`,
                },
                '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                  color: `${theme.palette.black.default} !important`,
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: 'bold',
                },
              }}
            />

            <Drawer
              variant="persistent"
              anchor="right"
              open={open}
              PaperProps={{
                style: {
                  border: 'none',
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'stretch',
                  width: 'auto',
                },
              }}
            >
              <Box flex="1" overflow="auto" py={5.5} pl={4} sx={{ overflowY: 'scroll' }}>
                <ClientCard data={selectedRow} theme={theme} toggleDrawer={toggleDrawer} />
              </Box>
            </Drawer>
          </Grid>
        </Grid>
        :
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="500px"
        >
          <CircularProgress sx={{ color: theme.palette.blue.first }} />
        </Box>
      }
    </>
  );

};

export default Clients;