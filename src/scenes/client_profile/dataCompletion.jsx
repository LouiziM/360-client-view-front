import ReactApexChart from "react-apexcharts";
import { Grid, Box, Typography } from '@mui/material';

const DataCompletion = ({ theme }) => {
  
  const data = [
    { label: "Contact", percentage: 50 },
    { label: "Situation démographique", percentage: 20 },
    { label: "Situation géographique", percentage: 40 }
  ];

  return (
    <Grid  container rowSpacing={1} xs={12} sm={12} md={12} lg={12} xl={12} style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box
          
          marginBottom="20px"
          mt="20px"            
          p="20px"
          style={{ borderRadius: '15px', overflow: 'hidden',boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }} 
          backgroundColor={theme.palette.primary.main}

        >
          <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary.light} gutterBottom>
            Complétude des données
          </Typography>
          <hr style={{ border: '1px solid #ccc', width: '100%' }} />
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" height="25vh">
            {data.map(({ label, percentage }, index) => (
              <Box key={index} display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" width="30%">
               
                <div style={{ width: 120, height: 120 }}>
                  <ReactApexChart
                    options={{
                      chart: {
                        height: 120,
                        type: "radialBar",
                      },
                      plotOptions: {
                        radialBar: {
                          hollow: {
                            size: "60%",
                            color:"#00449C"
                          },
                          dataLabels: {
                            name: {
                              show: false,
                            },
                            value: {
                              show: true,
                              offsetY: 8, 
                              fontSize: "20px", 
                              color: "#000000", 
                            },
                          },
                          track: {
                            strokeWidth: '80%', 
                            background: theme.palette.background.alt,
                          },
                        },
                      },
                      fill: {
                        type: 'solid',
                        colors: [theme.palette.secondary.light] 
                      },
                      
                    }}
                    series={[percentage]}
                    type="radialBar"
                    height={150}
                  /> 
                </div>
                <Typography height="40px" variant="h6" fontWeight="bold" color={theme.palette.secondary.light} textAlign="center">
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
