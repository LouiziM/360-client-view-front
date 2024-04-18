import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, frFR, gridClasses, GridLogicOperator, GridToolbarQuickFilter } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Grid, Box, Typography } from '@mui/material';
import { CustomTooltip } from './misc/customTooltip.tsx';

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
      backgroundColor: alpha(
        theme.palette.primary.faint,
        ODD_OPACITY,
      ),
    },
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.faint, ODD_OPACITY),
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


export default function SavTable({ theme }) {
  const rows = React.useMemo(
    () => {
      const data = [];
      for (let i = 1; i <= 50; i++) {
        data.push({
          id: i,
          date: `2024-03-${15 + i % 30}`,
          amount: 100 + i * 10,
          satisfaction: i % 2 === 0,
          site: `Site ${i % 3 + 1}`
        });
      }
      return data;
    },
    []
  );

  const columns = [
    { 
      field: 'date', 
      headerName: 'Date de visite', 
      flex: 1,
      renderCell: (params) => (
        <CustomTooltip title={params.value}>
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
            {params.value}
          </Typography>
        </CustomTooltip>
      ),
    },
    { 
      field: 'amount', 
      headerName: 'Montant dépensé', 
      flex: 1.1,
      renderCell: (params) => (
        <CustomTooltip title={params.value}>
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
            {params.value}
          </Typography>
        </CustomTooltip>
      ),
    },
    { 
      field: 'satisfaction', 
      headerName: 'Satisfaction', 
      flex: 1, 
      renderCell: (params) => {
        return params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }} />;
      }
    },
    { 
      field: 'site', 
      headerName: 'Site', 
      flex: 1,
      renderCell: (params) => (
        <CustomTooltip title={params.value}>
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
            {params.value}
          </Typography>
        </CustomTooltip>
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
        backgroundColor={theme.palette.primary.white}
      >
        <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary.light} gutterBottom>
          Passage SAV
        </Typography>
        <hr style={{ border: `1px solid ${theme.palette.secondary.light}`, width: '100%', marginBottom: "20px" }} />

        <StripedDataGrid
          rows={rows}
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
      </Box>
    </Grid>
  );
}
