import React, { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, frFR, gridClasses, GridLogicOperator, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Grid, Box, Typography } from '@mui/material';
import { ResponsiveRadialBar } from "@nivo/radial-bar";

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

const LegendItem = styled(Box)({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

const MarketingCampaigns = ({ theme }) => {
  const defaultDataColors = ["#3f51b5", "#4caf50", "#00a7c4"];
  const [dataColors, setDataColors] = useState(defaultDataColors);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const data = [
    {
      id: "Réponses aux campagnes",
      data: [{ x: "Réponses aux campagnes", y: 100 }]
    },
    {
      id: "Retour sur investissement",
      data: [{ x: "Retour sur investissement", y: 51 }]
    },
    {
      id: "Conversion Campagne",
      data: [{ x: "Conversion Campagne", y: 80 }]
    }
  ];

  const handleLegendHover = (color, index) => {
    setHoveredIndex(index);
    const newColors = defaultDataColors?.map((c, i) => (i === index ? color : 'transparent'));
    setDataColors(newColors);
  };

  const resetColors = () => {
    setDataColors(defaultDataColors);
    setHoveredIndex(null);
  };

  const Legend = () => (
    <Box
      onMouseLeave={() => resetColors()}
      display="flex"
      flexDirection="column"
      position="absolute"
      top="340px"
    >
      {data?.map((item, index) => (
        <LegendItem
          key={index}
          onMouseEnter={() => handleLegendHover(defaultDataColors[index], index)}
          onMouseLeave={() => resetColors()}
        >
          <Box
            width="18px"
            height="18px"
            borderRadius="50%"
            backgroundColor={dataColors[index]}
            marginRight="5px"
            marginBottom="2px"
          />
          <Typography variant="body2">
            {item.id} <strong>{item.data[0].y}%</strong>
          </Typography>

        </LegendItem>
      ))}
    </Box>
  );

  const rows = React.useMemo(() => {
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
  }, []);

  const columns = [
    { field: 'titre', headerName: 'Titre', flex: 1 },
    { field: 'marque', headerName: 'Marque', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'contenu', headerName: 'Contenu', flex: 1 },
  ];

  const Metric = ({ center }) => {
    if (hoveredIndex !== null) {
      const value = data[hoveredIndex].data[0].y;
      return (
        <text
          x={center[0]}
          y={center[1]}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: 20,
            fontWeight: "bold"
          }}
        >
          {value}%
        </text>
      );
    }
    return null;
  };
  return (
    <Grid item xs={12} sm={12} md={8} lg={8} xl={8} sx={{ borderRadius: '15px', position: 'relative', display: "flex" }}>
      <Box
        width="100%"
        height="100%"
        p="20px"
        style={{ borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}
        backgroundColor={theme.palette.primary.white}
        display="flex"
        flexDirection="column"
        position="relative"
      >
        <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary.light} >
          Campagnes marketing
        </Typography>
        <hr style={{ border: `1px solid ${theme.palette.secondary.light}`, width: '100%', marginBottom: "20px" }} />

        <Box onMouseLeave={() => resetColors()}>
          <Grid container spacing={2} position={"relative"}>
            <Grid item xs={12} sm={12} md={4}>
              <ResponsiveRadialBar
                data={data}
                innerRadius={0.3}
                padding={0.35}
                cornerRadius={1.5}
                colors={dataColors}
                borderColor={{
                  from: 'color',
                  modifiers: [['darker', '1']]
                }}
                enableTracks={false}
                circularAxisOuter={null}
                labelsSkipAngle={0}
                labelsRadiusOffset={0}
                // width={300}
                height={300}
                radialAxisStart={null}
                isInteractive={false}
                // margin={{ bottom: 40 }}
                cornerRadius={16}
                labelsTextColor={{ theme: 'grid.line.stroke' }}
                motionConfig={{
                  mass: 6,
                  tension: 320,
                  friction: 114,
                  clamp: false,
                  precision: 0.01,
                  velocity: 0.05
                }}
                transitionMode="startAngle"
                layers={['grid', 'tracks', 'bars', 'labels', Metric]}
              />
              <Legend />
            </Grid>
            <Grid item xs={12} sm={12} md={8} mt={{ xl:0, lg: 0, md: 0, sm: "90px", xs: "90px" }}>
              <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary.light} marginBottom={"20px"} textAlign={"center"}>
                Historique de participation aux campagnes
              </Typography>
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
                slots={{ toolbar: QuickSearchToolbar }}
                localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
              />
            </Grid>
          </Grid>
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
