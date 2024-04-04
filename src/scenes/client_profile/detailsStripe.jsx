import React,{useState,useEffect} from 'react';
import { Grid, Box, Typography } from '@mui/material';

const DetailsStripe = ({ theme , data }) => {

  const [list2Data, setList2Data] = useState([]);

  useEffect(() => {
    if (data) {
      let birthdate = data?.data.BIRTHDATE;
      let indexOfT = birthdate.indexOf('T');
      if (indexOfT !== -1) {
        birthdate = birthdate.substring(0, indexOfT);
      }
      let components = birthdate.split("-");
      let formattedDate = `${components[2]}/${components[1]}/${components[0]}`;

      
      setList2Data([
        data?.data.TYPECUST|| "__",
        data?.data.TYPECUST2|| "__",
        formattedDate|| "__",
        data?.data.POSTE || "__",
        data?.data.CIN|| "__"
      ]);
    }
  }, [data]);
  const [list4Data, setList4Data] = useState([]);
 
  
  useEffect(() => {
    if (data) {
      
      setList4Data([
        data?.data.CUSTNO|| "__",
        data?.data.PHONE|| "__",
        data?.data.EMAIL|| "__",
        data?.data.CITY|| "__",
        data?.data.CIN|| "__"
      ]);
    }
  }, [data]);
 const list1Data = [
    "Type",
    "Catégorie",
    "Date de naissance",
    "Profession",
    "CIN"
  ];
 


  const list3Data = [
    "IDC",
    "N° Tél",
    "Email",
    "Ville",
    "Classe"
  ];

 

    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ borderRadius: '15px'}}>
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
            style={{ borderRadius: '15px',boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }} 
          >

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
    
         
            <Grid container item xs={6} sm={6} md={3} justifyContent="center" >
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
            
              <Typography variant="h5" fontWeight="bold" color={theme.palette.background.default} style={{ textAlign: 'center'  }}>  {`${data?.data.CIVILITY}${data?.data.FIRSTNAME} ${data?.data.NAME2}`}</Typography>
              
            </Grid>
    
  
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
