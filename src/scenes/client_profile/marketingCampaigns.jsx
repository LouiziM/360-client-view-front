import * as React from 'react';
import { alpha, styled} from '@mui/material/styles';
import { DataGrid, gridClasses, GridLogicOperator, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Grid, Box, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

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

const MarketingCampaigns = ({ theme }) => {
  const rows = React.useMemo(
    () => {
      const data = [];
      for (let i = 1; i <= 50; i++) {
        data.push({ 
          id: i, 
          titre: `Titre ${i}`, 
          marque: `Marque ${i % 5 + 1}`, 
          type: `Type ${i % 3 + 1}`, 
          date: `2024-03-${15 + i % 30}`, 
          contenu: `Contenu ${i}`
        });
      }
      return data;
    },
    []
  );

  const columns = [
    { field: 'titre', headerName: 'Titre', flex: 1 },
    { field: 'marque', headerName: 'Marque', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'contenu', headerName: 'Contenu', flex: 1 },
  ];

  return (
    <Grid container xs={17.5} sm={24} md={24} lg={17.5} xl={17.5} style={{ borderRadius: '15px'}}>
      <Box
        width="100%"
        marginBottom="20px"
        mt="20px"
        p="20px"
        style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}
        backgroundColor={theme.palette.primary.main}
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary.light} gutterBottom>
          Campagnes marketing
        </Typography>
        <hr style={{ border: '1px solid #ccc', width: '100%', marginBottom:"20px"}} />
        
        <Box display="flex" flexGrow={1}>
          <Box style={{  flex: '5 5 0' }}>
            <ReactApexChartComponent />
          </Box>
          <Box style={{ flex: '6 6 0' }}>
            <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary.light} gutterBottom>
              Historique de participation aux campagnes
            </Typography>
            <StripedDataGrid
          rows={rows}
          columns={columns}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          sx={{ '&, [class^=MuiDataGrid]': { borderBottom: 'none', borderRight: 'none', borderLeft: 'none', borderTop: 'none', maxHeight: 'calc(100vh - 330px)' } }}
          initialState={{
            filter: {
              filterModel: {
                items: [],
                quickFilterLogicOperator: GridLogicOperator.Or,
              },
            },
          }}
          slots={{ toolbar: QuickSearchToolbar }}
        />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default MarketingCampaigns;

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
      height="70px"
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
  );
}

const ReactApexChartComponent = () => {
  const options = {
    chart: {
      height: 230,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 50,
        offsetX: 40,
        startAngle: 0,
        endAngle: 220,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
    labels: [
      "Conversion Campagne",
      "Retour sur investissement",
      "Réponse aux campagnes",
    ],
    legend: {
      show: true,
      floating: true,
      fontSize: "13px",
      position: "left",
      offsetX: -30,
      offsetY:95,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return seriesName + "  " + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        vertical: 4,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  const series = [100, 67, 30];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type={options.chart.type}
      height={options.chart.height}
    />
  );
};
