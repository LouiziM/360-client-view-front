import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Grid, Button } from '@mui/material';
import { useGetAllClientsQuery } from '../../features/state/clientSlice';
import { GridToolbarContainer, gridClasses, GridToolbarDensitySelector, GridToolbarColumnsButton, GridToolbarFilterButton,GridLogicOperator } from '@mui/x-data-grid';
import { useGridApiContext,GridToolbarQuickFilter, GridCsvExportOptions, useGridApiEventHandler, GridCsvGetRowsToExportParams, gridPaginatedVisibleSortedGridRowIdsSelector, gridSortedRowIdsSelector, gridExpandedSortedRowIdsSelector } from '@mui/x-data-grid'
import { createSvgIcon } from '@mui/material/utils';
import { useTheme } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import ClientCard from './clientCard';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import CircularProgress from '@mui/material/CircularProgress'; 


const ODD_OPACITY = 0.4;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.secondary.faint,
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.secondary.light, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.secondary.light,
        ODD_OPACITY,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.secondary.light,
          ODD_OPACITY
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.secondary.light,
            ODD_OPACITY
          ),
        },
      },
    },
  },
  [`& .${gridClasses.row}.odd`]: { 
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.dark,
        ODD_OPACITY,
      ),
    },
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.dark, ODD_OPACITY),
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
    { field: 'CUSTNO', headerName: 'Nb', type: 'number', width: 60 },
    { field: 'NAME2', headerName: 'Nom', type: 'string', width: 110 },
    { field: 'FIRSTNAME', headerName: 'Prénom', type: 'string', width: 110 },
  
   
    { field: 'CITY', headerName: 'Cité', type: 'string', width: 120 },
    { field: 'COUNTRY', headerName: 'Pays', type: 'string', width: 100 },
    {
      field: 'DATECRE',
      headerName: 'Crée le',
      type: 'date',
      width: 90,
      valueGetter: (params) => new Date(params.value)
    }   
,    
    { field: 'PHONE', headerName: 'Tel', type: 'string', width: 120 },
    { field: 'ZIP', headerName: 'ZIP', type: 'number', width: 70 },
    { field: 'ADDRESS', headerName: 'Adresse', type: 'string', width: 240 },
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
          <Grid item lg={12} sx={{ height: '74vh' }}>
            <StripedDataGrid
              theme={theme}
              rows={clients}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
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
              }}
              localeText={{
                toolbarColumns: 'Colonnes',
                toolbarFilters: 'Filtrer',
                toolbarDensity: 'Densité',
                MuiTablePagination: {
                  labelDisplayedRows: ({ from, to, count }) =>
                    `${from} - ${to} de ${count}`,
                  
                },

              }}
              
              sx={{
                '& .MuiDataGrid-root': {
                  border: 'none',
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: 'none',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: theme.palette.background.alt,
                  borderBottom: 'none',
                },
                '& .MuiDataGrid-virtualScroller': {
                  backgroundColor: theme.palette.primary.light,
                },
                '& .MuiDataGrid-footerContainer': {
                  backgroundColor: theme.palette.background.alt,
                  color: theme.palette.secondary[100],
                  borderTop: 'none',
                },
                '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                  color: `${theme.palette.secondary[200]} !important`,
                },
                '& .MuiDataGrid-selectedRowCount': {
                  visibility: 'hidden',
                  padding: 0, 
                  margin: 0,
                },
                '& .MuiDataGrid-selectedRowCount::before': {
                  content: '""',
                },
                '& .MuiDataGrid-selectedRowCount::after': {
                  content: '"1 ligne sélectionnée"', 
                  visibility: 'visible', 
                  display: 'inline',
                  padding: 0, 
                  margin: "-9vh",
                },
                '& .MuiTablePagination-selectLabel': {
                  visibility: 'hidden',
                  padding: 0, 
                  margin: 0, 
                },
                '& .MuiTablePagination-selectLabel::before': {
                  content: '""',
                },
                '& .MuiTablePagination-selectLabel::after': {
                  content: '"Lignes par page"', 
                  visibility: 'visible', 
                  display: 'inline',
                  padding: 0, 
                  margin: 0, 
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
          <CircularProgress sx={{color:theme.palette.secondary.light}} />
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
      border="1px solid"
      borderColor={"#004BAB"}  
      p="0rem 0.5rem"
      width="100%"
      height="6.5vh"
    >
      <GridToolbarQuickFilter 
        quickFilterParser={(searchInput) =>
          searchInput
            .split(',')
            .map((value) => value.trim())
            .filter((value) => value !== '')
        }
        sx={{width:"100%",
        pt:1.5,
        pb: 0,}}
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