import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, useMediaQuery } from '@mui/material';
import dayjs from 'dayjs';

const DetailsStripe = ({ theme, clientSelected }) => {

  const query900 = useMediaQuery('(min-width: 900px)');
  const [list2Data, setList2Data] = useState([]);
  const [list4Data, setList4Data] = useState([]);

  useEffect(() => {
    if (clientSelected) {
      setList2Data([
        clientSelected?.TYPECUST || "-",
        "-",
        clientSelected?.BIRTHDATE ? dayjs(clientSelected?.BIRTHDATE).format('DD/MM/YYYY') : "-",
        "-",
        clientSelected?.CIN || "-"
      ]);

      setList4Data([
        clientSelected?.CUSTNO || "-",
        (clientSelected?.PHONE ? clientSelected?.PHONE : '') + (clientSelected?.PHONE && clientSelected?.PHONEPRI ? ' / ' : '') + (clientSelected?.PHONEPRI ? clientSelected?.PHONEPRI : ''),
        clientSelected?.EMAIL || "-",
        clientSelected?.CITY || "-",
        "-"
      ]);
    }
  }, [clientSelected]);

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
      backgroundColor: theme.palette.blue.first,
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
              <Typography variant="h5" fontWeight="bold" color={theme.palette.white.first}>
                {item}
              </Typography>
            </Grid>
            <Grid item xs={7} sx={{ pl: '0 !important', pt: '0 !important' }}>
              <Typography variant="h5" color={theme.palette.white.first}>
                {list2Data[index]}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} sm={12} md={4} order={query900 ? 1 : 0}>
        <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
          <img
            src={clientSelected?.TYPECUST === "Particuliers" ? require('../../assets/profile.png') : require('../../assets/company.png')}
            alt={clientSelected?.TYPECUST === "Particuliers" ? "Image Client" : "Image Société"}
            style={{
              width: "230px",
              height: "230px",
              objectFit: "contain",
            }}
          />
          <Typography variant="h5" fontWeight="bold" color={theme.palette.white.first} style={{ textAlign: 'center' }}>
            {`${clientSelected?.CIVILITY ? clientSelected?.CIVILITY + '.' : ''} ${clientSelected?.FIRSTNAME || ''} ${clientSelected?.NAME2 || ''}`}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={4} order={2}>
        {list3Data?.map((item, index) => (
          <Grid item container spacing={4} key={index} width={"100%"} mt={'22px'} ml={0}>
            <Grid item xs={query900 ? 4 : 5} sx={{ pl: '0 !important', pt: '0 !important' }}>
              <Typography variant="h5" fontWeight="bold" color={theme.palette.white.first}>
                {item}
              </Typography>
            </Grid>
            <Grid item xs={query900 ? 8 : 7} sx={{ pl: '0 !important', pt: '0 !important' }}>
              <Typography variant="h5" color={theme.palette.white.first} sx={{ overflowWrap: 'anywhere' }}>
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
