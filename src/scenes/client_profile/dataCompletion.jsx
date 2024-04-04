import React, { useEffect, useState } from "react";
import { Grid, Box, Typography } from '@mui/material';
import { useGetCompletionQuery } from '../../features/state/clientSlice';
import { ResponsiveRadialBar } from "@nivo/radial-bar";

const DataCompletion = ({ theme, client }) => {
  const { data: completionData, isLoading, isError, isSuccess, error } = useGetCompletionQuery(client.data.CUSTNO);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching completion data:", error);
    }
  
    if (completionData) {
      const newData = [
        {
          label: 'Contact',
          percentage: completionData.Contact['Completion Ratio'],
          missingFields: completionData.Contact['Missing Fields']
        },
        {
          label: 'Situation démographique',
          percentage: completionData['Situation démographique']['Completion Ratio'],
          missingFields: completionData['Situation démographique']['Missing Fields']
        },
        {
          label: 'Situation géographique',
          percentage: completionData['Situation géographique']['Completion Ratio'],
          missingFields: completionData['Situation géographique']['Missing Fields']
        }
      ];
      setData(newData);
    }
  }, [completionData, isError, error]);
  

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
       {bars[0].value}%
      </text>
    );
  };

  return (
    <Grid container rowSpacing={1} xs={12} sm={12} md={12} lg={6} xl={12} style={{ borderRadius: '15px' }}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box
          marginBottom="20px"
          mt="20px"
          p="20px"
          style={{ borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}
          backgroundColor={theme.palette.primary.main}
        >
          <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary.light} gutterBottom>
            Complétude des données
          </Typography>
          <hr style={{ border: '1px solid #ccc', width: '100%' }} />
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" height="25vh">
            {data.map(({ label, percentage, missingFields }, index) => (
             <Box key={index} display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" width="30%">
             <Box
               display="flex"
               flexDirection="column"
               alignItems="center"
               width="100%"
               height={"19vh"}
             >
               <Box
                 display="flex"
                 alignItems="center"
                 justifyContent="center"
                 width={100}
                 height={"18vh"}
               >
                 <ResponsiveRadialBar
                    
                    width={100}
                    height={120}
                    valueFormat={(v) => `${v}%`}
                    maxValue={100}
                    startAngle={360}
                    endAngle={0}
                    cornerRadius={100}
                    innerRadius={0.8}
                    colors={[theme.palette.secondary.light]}
                    motionConfig={{
                      mass: 6,
                      tension: 251,
                      friction: 114,
                      clamp: false,
                      precision: 0.01,
                      velocity: 0.05
                  }}
                  transitionMode="startAngle"
                    data={[
                      {
                        id: missingFields.map((field, index) => (
                          <React.Fragment key={index}>
                            {index === 0 ? '' : ' - '}
                            {field}
                            {index !== missingFields.length - 1 && '\n'}
                            {index == missingFields.length -1 &&'\n'}
                          </React.Fragment>
                        )),
                        data: [{ x: <Box pr={2} display="flex" alignItems="center" flexDirection={"column"}>
                        <Typography fontWeight="bold">Champs manquants</Typography>
                        <hr style={{ width:"100%", borderBottom: '2px solid black' }} />
                      </Box>
                      , y: percentage }]
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
               color={theme.palette.secondary.light}
               textAlign="center"
             >
               {label}
             </Typography>
           </Box>
           
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DataCompletion;
