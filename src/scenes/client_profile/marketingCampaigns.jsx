import React, { useEffect, useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, frFR, gridClasses, GridLogicOperator, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Grid, Box, Typography, IconButton, Modal, useMediaQuery } from '@mui/material';
import { ResponsiveRadialBar } from "@nivo/radial-bar";
import { CustomTooltip } from './misc/customTooltip.tsx';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { transformedPhoneNumber } from 'utils/index.js';

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

const LegendItem = styled(Box)({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

const MarketingCampaigns = ({ theme, clientSelected }) => {
  const defaultDataColors = ["#3f51b5", "#4caf50", "#00a7c4"];
  const [dataColors, setDataColors] = useState(defaultDataColors);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const data = [
    {
      id: "Réponses aux campagnes",
      data: [{ x: "", y: 50 }]
    }
  ];

  //Marketing Campagains Data
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isLoading, setIsLoading] = useState(false);
  const [marketingCampaigns, setMarketingCampaigns] = useState({});
  const [viewContent, setViewContent] = useState(false);
  const [rowCampaign, setRowCampaign] = useState(null);

  const handleCloseContent = () => setViewContent(false);
  const handleViewContent = (row) => {
    setViewContent(true);
    setRowCampaign(row);
  }

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
      top="300px"
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

  const fetchMarketingCampaigns = async () => {
    setIsLoading(true);
    const phones = [clientSelected?.PHONE, clientSelected.PHONEPRI];
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL_CAMPAIGN}`, {
        params: {
          email: clientSelected?.EMAIL,
          phones: phones?.map(transformedPhoneNumber).filter(Boolean)
        }
      });
      setMarketingCampaigns(res?.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error?.response?.data?.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMarketingCampaigns();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        field: 'titre',
        headerName: 'Titre',
        flex: 1,
        minWidth: 160,
        align: "center",
        renderCell: function render({ row }) {
          return (
            <>
              {row?.titre ?
                <CustomTooltip title={row?.titre}>
                  <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} >
                    {row?.titre}
                  </Typography>
                </CustomTooltip>
                : '-'
              }
            </>
          );
        },
      },
      {
        field: 'marque',
        headerName: 'Marque',
        flex: 1,
        minWidth: 160,
        align: "center",
        renderCell: function render({ row }) {
          return (
            <>
              {row?.marque ?
                <CustomTooltip title={row?.marque}>
                  <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} >
                    {row?.marque}
                  </Typography>
                </CustomTooltip>
                : '-'
              }
            </>
          );
        },
      },
      {
        field: 'type',
        headerName: 'Type',
        align: "center",
        flex: 1,
        minWidth: 60,
        renderCell: function render({ row }) {
          return (
            <>
              {row?.type ?
                <CustomTooltip title={row?.type}>
                  <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} >
                    {row?.type}
                  </Typography>
                </CustomTooltip>
                : '-'
              }
            </>
          );
        },
      },
      {
        field: 'date',
        headerName: 'Date',
        flex: 1,
        minWidth: 200,
        align: "center",
        renderCell: function render({ row }) {
          return (
            <>
              {row?.date ?
                <CustomTooltip title={row?.date}>
                  <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} >
                    {row?.date}
                  </Typography>
                </CustomTooltip>
                : '-'
              }
            </>
          );
        },
      },
      {
        field: 'contenu',
        headerName: 'Contenu',
        flex: 1,
        minWidth: 60,
        align: "center",
        renderCell: function render({ row }) {
          return (
            <>
              {!row?.content ? '-' :
                <>
                  <IconButton onClick={() => handleViewContent(row)}>
                    <VisibilityIcon sx={{ color: theme.palette.blue.first }} />
                  </IconButton>
                </>
              }
            </>
          );
        },
      },
    ],
    []
  );


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
        backgroundColor={theme.palette.white.first}
        display="flex"
        flexDirection="column"
        position="relative"
      >
        <Typography variant="h5" fontWeight="bold" color={theme.palette.blue.first} >
          Campagnes marketing
        </Typography>
        <hr style={{ border: `1px solid ${theme.palette.blue.first}`, width: '100%', marginBottom: "20px" }} />

        <Box onMouseLeave={() => resetColors()}>
          <Grid container spacing={2} position={"relative"}>
            <Grid item xs={12} sm={12} md={4}>
              <ResponsiveRadialBar
                data={data}
                innerRadius={0.3}
                padding={0.7}
                cornerRadius={16}
                colors={dataColors}
                maxValue={100}
                startAngle={0}
                endAngle={360}
                // borderColor={{
                //   from: 'color',
                //   modifiers: [['darker', '1']]
                // }}
                enableRadialGrid={false}
                enableCircularGrid={false}
                enableTracks={true}
                circularAxisOuter={null}
                labelsSkipAngle={0}
                labelsRadiusOffset={0}
                // width={300}
                height={300}
                radialAxisStart={null}
                isInteractive={true}
                // margin={{ bottom: 40 }}
                labelsTextColor={{ theme: 'grid.line.stroke' }}
                transitionMode="startAngle"
                layers={['grid', 'tracks', 'bars', 'labels', Metric]}
              />
              <Legend />
            </Grid>
            <Grid item xs={12} sm={12} md={8} mt={{ xl: 0, lg: 0, md: 0, sm: "10px", xs: "10px" }}>
              <Typography variant="h5" fontWeight="bold" color={theme.palette.blue.first} marginBottom={"20px"} textAlign={"center"}>
                Historique de participation aux campagnes
              </Typography>
              <StripedDataGrid
                rows={marketingCampaigns?.data || []}
                columns={columns}
                loading={isLoading}
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
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Modal of Content Marketing Campaign */}
      <Modal
        open={viewContent}
        onClose={handleCloseContent}
        aria-labelledby="modal-mc-content"
        aria-describedby="modal-mc-content-description"
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
          <div dangerouslySetInnerHTML={{ __html: rowCampaign?.content }} />
        </Box>
      </Modal>

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
