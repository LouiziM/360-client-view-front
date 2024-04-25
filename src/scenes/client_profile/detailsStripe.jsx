import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, useMediaQuery } from '@mui/material';
import dayjs from 'dayjs';

const DetailsStripe = ({ theme, data }) => {

  const query900 = useMediaQuery('(min-width: 900px)');
  const [list2Data, setList2Data] = useState([]);
  const [list4Data, setList4Data] = useState([]);

  useEffect(() => {
    if (data) {
      setList2Data([
        data?.data?.TYPECUST || "__",
        data?.data?.TYPECUST2 || "__",
        data?.data?.BIRTHDATE ? dayjs(data?.data?.BIRTHDATE).format('DD/MM/YYYY') : "__",
        data?.data?.POSTE || "__",
        data?.data?.CIN || "__"
      ]);

      setList4Data([
        data?.data?.CUSTNO || "__",
        data?.data?.PHONE || "__",
        data?.data?.EMAIL || "__",
        data?.data?.CITY || "__",
        data?.data?.CIN || "__"
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
    <Grid container spacing={2} sx={{
      borderRadius: '10px',
      width: '100%',
      backgroundColor: theme.palette.secondary.light,
      p: useMediaQuery('(min-width: 1024px)') ? '30px 80px' : '30px 15px',
      borderRadius: '15px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      mt: 0,
      ml: 0
    }}>
      <Grid item xs={12} sm={12} md={4} order={query900 ? 0 : 1}>
        {list1Data?.map((item, index) => (
          <Grid item container spacing={4} key={index} width={"100%"} mt={'22px'} ml={0}>
            <Grid item xs={5} sx={{ pl: '0 !important', pt: '0 !important' }}>
              <Typography variant="h5" fontWeight="bold" color={theme.palette.background.default}>
                {item}
              </Typography>
            </Grid>
            <Grid item xs={7} sx={{ pl: '0 !important', pt: '0 !important' }}>
              <Typography variant="h5" color={theme.palette.background.default}>
                {list2Data[index]}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} sm={12} md={4} order={query900 ? 1 : 0}>
        <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
          <img
            src={data?.data?.TYPECUST === "Societe" ? require('../../assets/company.png') : require('../../assets/profile.png')}
            alt={data?.data?.TYPECUST === "Societe" ? "Image Societé" : "Image Client"}
            style={{
              width: "230px",
              height: "230px",
              objectFit: "contain",
            }}
          />
          <Typography variant="h5" fontWeight="bold" color={theme.palette.background.default} style={{ textAlign: 'center' }}>
            {`${data?.data?.CIVILITY || ''}${data?.data?.FIRSTNAME || ''} ${data?.data?.NAME2 || ''}`}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={4} order={2}>
        {list3Data?.map((item, index) => (
          <Grid item container spacing={4} key={index} width={"100%"} mt={'22px'} ml={0}>
            <Grid item xs={query900 ? 4 : 5} sx={{ pl: '0 !important', pt: '0 !important' }}>
              <Typography variant="h5" fontWeight="bold" color={theme.palette.background.default}>
                {item}
              </Typography>
            </Grid>
            <Grid item xs={query900 ? 8 : 7} sx={{ pl: '0 !important', pt: '0 !important' }}>
              <Typography variant="h5" color={theme.palette.background.default} sx={{ overflowWrap: 'anywhere' }}>
                {list4Data[index]}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default DetailsStripe;
