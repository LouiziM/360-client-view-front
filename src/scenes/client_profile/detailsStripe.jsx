import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

const DetailsStripe = ({ theme }) => {
  // Placeholder data for list 1
  const list1Data = [
    "Type",
    "Catégorie",
    "Date de naissance",
    "Profession",
    "CIN"
  ];

  // Placeholder data for list 2 (static)
  const list2Data = [
    "Type Value",
    "Category Value",
    "Birth Date Value",
    "Profession Value",
    "CIN Value"
  ];

  // Placeholder data for list 3
  const list3Data = [
    "IDC",
    "N° Téléphone",
    "Email",
    "Ville",
    "Classe"
  ];

  // Placeholder data for list 4
  const list4Data = [
    "IDC Value",
    "Phone Number Value",
    "Email Value",
    "City Value",
    "Class Value"
  ];

    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            backgroundColor={theme.palette.secondary.light}
            p="20px"
            marginBottom="20px"
            mt="40px"
            style={{ borderRadius: '15px', overflow: 'hidden',boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }} 
          >
            {/* Table for List 1 and List 2 */}
            <table style={{ width: '50%' ,marginLeft:"4%"}}>
              <tbody>
                {list1Data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Typography variant="h5" fontWeight="bold" color={theme.palette.background.default} style={{ overflowWrap: 'break-word' }}>
                        {item}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="h5" color={theme.palette.background.default} style={{ overflowWrap: 'break-word' }}>
                        {list2Data[index]}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
    
            {/* Image */}
            <Grid container item xs={6} sm={6} md={3} justifyContent="center">
              <div style={{ width: "75%", maxHeight: "20%", aspectRatio: "1 / 1" }}>
                <img
                  src={require('../../assets/client.jpg')}
                  alt="Image Client"
                  style={{
                    borderRadius: "60%",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

              </div>      
            
              <Typography variant="h5" fontWeight="bold" color={theme.palette.background.default} style={{ textAlign: 'center'  }}>Name Text</Typography>
              
            </Grid>
    
            {/* Table for List 3 and List 4 */}
            <table style={{ width: '50%' ,marginLeft:'11vh'}}>
              <tbody>
                {list3Data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Typography variant="h5" fontWeight="bold" color={theme.palette.background.default} style={{ overflowWrap: 'break-word' }}>
                        {item}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="h5" color={theme.palette.background.default} style={{ overflowWrap: 'break-word' }}>
                        {list4Data[index]}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Grid>
      </Grid>
    );
    
 }
export default DetailsStripe;
