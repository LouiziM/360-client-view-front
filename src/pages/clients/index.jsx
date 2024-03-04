import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Clients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Nom", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Téléphone", width: 150 },
    { field: "address", headerName: "Adresse", width: 250 },
    { field: "gender", headerName: "Genre", width: 120 },
    { field: "age", headerName: "Âge", type: "number", width: 100 },
    { field: "profession", headerName: "Profession", width: 200 },
  ];

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/clients/get_all_clients')
  .then(response => {
    console.log(response.data);
    setData(response.data);
    setLoading(false);
  })
  .catch(error => {
    console.error('Error:', error);
    console.error('Error Response:', error.response);
  });
     
   
  }, []);

  return (
    <Box m="20px" display="relative" marginLeft="270px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CLIENTS" subtitle="Bienvenue dans vos clients" />
      </Box>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default Clients;
