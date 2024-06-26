import React from "react";
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import { ResponsiveRadialBar } from "@nivo/radial-bar";

const DataCompletion = ({ theme, completion, isLoading }) => {

  const Metric = ({ center, bars }) => {
    return (
      <text
        x={center[0]}
        y={center[1]}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: 20,
        }}
      >
        {bars[0]?.value}%
      </text>
    );
  };

  return (
    <Grid item rowSpacing={1} xs={12} sm={12} md={6} lg={6} xl={6} sx={{ borderRadius: '15px', display: "flex" }}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box
          p="20px"
          height="100%"
          style={{ borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}
          backgroundColor={theme.palette.white.first}
        >
          <Typography variant="h5" fontWeight="bold" color={theme.palette.blue.first} gutterBottom>
            Complétude des données
          </Typography>
          <hr style={{ border: `1px solid ${theme.palette.blue.first}`, width: '100%' }} />
          {isLoading ?
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="80%"
            >
              <CircularProgress sx={{ color: theme.palette.blue.first }} />
            </Box> :
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" margin={"20px 0 0 0"}>
              {completion?.data?.map(({ label, percentage, missingFields }, index) => (
                <Box key={index} display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" width="30%">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      width={100}
                      height={"120px"}
                    >
                      <ResponsiveRadialBar

                        // width={100}
                        // height={120}
                        valueFormat={(v) => `${v}%`}
                        maxValue={100}
                        startAngle={360}
                        endAngle={0}
                        cornerRadius={100}
                        innerRadius={0.8}
                        colors={[theme.palette.blue.first]}
                        transitionMode="startAngle"
                        isInteractive={missingFields?.length > 0}
                        data={[
                          {
                            id: missingFields?.map((field, index) => (
                              <React.Fragment key={index}>
                                {index === 0 ? '' : ' - '}
                                {field}
                                {index !== missingFields?.length - 1 && '\n'}
                                {index == missingFields?.length - 1 && '\n'}
                              </React.Fragment>
                            )),
                            data: [{
                              x: <Box pr={2} display="flex" alignItems="center" flexDirection={"column"}>
                                <Typography fontWeight="bold">Champs manquants</Typography>
                                <hr style={{ width: "100%", borderBottom: '2px solid black' }} />
                              </Box>
                              , y: percentage
                            }]
                          }
                        ]}
                        layers={["tracks", "bars", Metric]}
                      />
                    </Box>
                  </Box>
                  <Typography
                    height="40px"
                    variant="h6"
                    fontWeight="bold"
                    color={theme.palette.blue.first}
                    textAlign="center"
                  >
                    {label}
                  </Typography>
                </Box>

              ))}
            </Box>
          }
        </Box>
      </Grid>
    </Grid>
  );
};

export default DataCompletion;
