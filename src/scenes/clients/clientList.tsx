import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Grid, Button } from '@mui/material';
import { useGetAllClientsQuery } from '../../features/state/clientSlice';
import { GridToolbarContainer, gridClasses, GridToolbarDensitySelector, GridToolbarColumnsButton, GridToolbarFilterButton, GridLogicOperator } from '@mui/x-data-grid';
import { useGridApiContext, GridToolbarQuickFilter, GridCsvExportOptions, useGridApiEventHandler, GridCsvGetRowsToExportParams, gridPaginatedVisibleSortedGridRowIdsSelector, gridSortedRowIdsSelector, gridExpandedSortedRowIdsSelector } from '@mui/x-data-grid'
import { createSvgIcon } from '@mui/material/utils';
import { useTheme } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import ClientCard from './clientCard';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import CircularProgress from '@mui/material/CircularProgress';
import { frFR } from "@mui/x-data-grid/locales";
import { CustomTooltip } from 'scenes/client_profile/misc/customTooltip.tsx';
import dayjs from 'dayjs';

const ODD_OPACITY = 0.4;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.secondary.faint,
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.faint, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.faint,
        ODD_OPACITY,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.faint,
          ODD_OPACITY
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.faint,
            ODD_OPACITY
          ),
        },
      },
    },
  },
  [`& .${gridClasses.row}.odd`]: {
    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette.primary.faint, ODD_OPACITY)
    },
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.faint, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    }
  },
}));



interface Client {
  CUSTNO: number;
  NAME2: string;
  FIRSTNAME: string;
  ADDRESS: string;
  ZIP: number;
  CITY: string;
  COUNTRY: string;
  BIRTHDATE: Date;
  PHONE: string;
  PHONEPRI: bigint;
  EMAIL: string;
  FAX: string;
  CIVILITY: string;
  DATECRE: Date;
  TYPECUST: number;
  TYPECUST2: number;
  ICE: number;
  CIN: string;
  INTERGROUPE: boolean;
  SITE: string;
  REGION: string;
  GENDER: string;
  NATIONALITY: string;
  isFormatted: boolean;
  isImputed: boolean;
  LIBSITE: string;

}

const Clients = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const { data: clients = [], isLoading } = useGetAllClientsQuery();
  const theme = useTheme();
  const [selectedRow, setSelectedRow] = React.useState<Client | null>(null);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const columns: GridColDef[] = [
    { 
      field: 'CUSTNO', 
      headerName: 'Nb', 
      type: 'number', 
      width: 80,
      renderCell: ({ row }) => (
        <CustomTooltip title={row.CUSTNO ? row.CUSTNO.toString() : ''} />
      )
    },
    { 
      field: 'NAME2', 
      headerName: 'Nom', 
      type: 'string', 
      width: 150,
      renderCell: ({ row }) => (
        <CustomTooltip title={row.NAME2 ? row.NAME2 : ''} />
      )
    },
    { 
      field: 'FIRSTNAME', 
      headerName: 'Prénom', 
      type: 'string', 
      width: 150,
      renderCell: ({ row }) => (
        <CustomTooltip title={row.FIRSTNAME ? row.FIRSTNAME : ''} />
      )
    },
    { 
      field: 'CITY', 
      headerName: 'Ville', 
      type: 'string', 
      width: 150,
      renderCell: ({ row }) => (
        <CustomTooltip title={row.CITY ? row.CITY : ''} />
      )
    },
    { 
      field: 'COUNTRY', 
      headerName: 'Pays', 
      type: 'string', 
      width: 120,
      renderCell: ({ row }) => (
        <CustomTooltip title={row.COUNTRY ? row.COUNTRY : ''} />
      )
    },
    {
      field: 'DATECRE',
      headerName: 'Crée le',
      type: 'date',
      width: 110,
      valueGetter: (params) => new Date(params.value),
      renderCell: ({ row }) => (
        <CustomTooltip title={row.DATECRE ? dayjs(row.DATECRE).format('DD/MM/YYYY') : ''} />
      )
    },
    { 
      field: 'PHONE', 
      headerName: 'Tel', 
      type: 'string', 
      width: 150,
      renderCell: ({ row }) => (
        <CustomTooltip title={row.PHONE ? row.PHONE : ''} />
      )
    },
    { 
      field: 'ZIP', 
      headerName: 'ZIP', 
      type: 'number', 
      width: 90,
      renderCell: ({ row }) => (
        <CustomTooltip title={row.ZIP ? row.ZIP.toString() : ''} />
      )
    },
    { 
      field: 'ADDRESS', 
      headerName: 'Adresse', 
      type: 'string', 
      flex: 1,
      renderCell: ({ row }) => (
        <CustomTooltip title={row.ADDRESS ? row.ADDRESS : ''} />
      )
    },
  ];

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const clickedRow = clients.find(client => client.CUSTNO === params.row.CUSTNO);
    setSelectedRow(clickedRow || null);
    setOpen(true);

  };


  return (
    <>
      {clients.length > 0 ? (
        <Grid container p={5}>
          <Grid item lg={12} width={"100%"}>
            <StripedDataGrid
              theme={theme}
              rows={clients}
              columns={columns}
              components={{ Toolbar: EditToolbar }}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
              }
              onRowClick={handleRowClick}
              initialState={{
                filter: {
                  filterModel: {
                    items: [],
                    quickFilterLogicOperator: GridLogicOperator.Or,
                  },
                },
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
              },
              }}
              pageSizeOptions={[10, 25, 100]}
              localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
              sx={{
                '& .MuiDataGrid-root': {
                  border: 'none',
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: 'none',
                },
                '& .MuiDataGrid-columnHeaders': {
                  borderTop: `1px solid ${theme.palette.primary.light}`,
                },
                '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                  color: `${theme.palette.secondary[200]} !important`,
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
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="500px"
        >
          <CircularProgress sx={{ color: theme.palette.secondary.light }} />
        </Box>
      )}
    </>
  );

};

export default Clients;

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}
function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const getRowsFromCurrentPage = ({ apiRef }: GridCsvGetRowsToExportParams) =>
    gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);

  const getUnfilteredRows = ({ apiRef }: GridCsvGetRowsToExportParams) =>
    gridSortedRowIdsSelector(apiRef);

  const getFilteredRows = ({ apiRef }: GridCsvGetRowsToExportParams) =>
    gridExpandedSortedRowIdsSelector(apiRef);

  const ExportIcon = createSvgIcon(
    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
    'SaveAlt',
  );
  const apiRef = useGridApiContext();

  const handleExport = (options: GridCsvExportOptions) =>
    apiRef.current.exportDataAsCsv(options);

  const buttonBaseProps: ButtonProps = {
    color: 'primary',
    size: 'small',
    startIcon: <ExportIcon />,
  };

  return (
    <GridToolbarContainer>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor={"#ffffff"}
        borderRadius="9px"
        // border="1px solid"
        // borderColor={"#004BAB"}
        p="0rem 0.5rem"
        width="100%"
        // height="6.5vh"
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
            pt: 1.5,
            pb: 0,
          }}
        />

      </Box>
      <GridToolbarDensitySelector />
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <Button
        {...buttonBaseProps}
        onClick={() => handleExport({ getRowsToExport: getRowsFromCurrentPage })}
      >
        Exporter la page
      </Button>
      <Button
        {...buttonBaseProps}
        onClick={() => handleExport({ getRowsToExport: getFilteredRows })}
      >
        Lignes filtrées
      </Button>
      <Button
        {...buttonBaseProps}
        onClick={() => handleExport({ getRowsToExport: getUnfilteredRows })}
      >
        Lignes non filtrées
      </Button>
    </GridToolbarContainer>
  );
}