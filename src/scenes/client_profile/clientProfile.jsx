import React, { useEffect, useState } from 'react';
import FlexBetween from "components/FlexBetween";
import { DownloadOutlined, ArrowBack } from "@mui/icons-material";
import { Grid, Box, Button, useTheme, Typography } from "@mui/material";
import DetailsStripe from "./detailsStripe";
import DataCompletion from "./dataCompletion";
import FinancialData from "./financialDetails";
import ClientPark from "./clientPark";
import SavTable from "./savTable";
import ClientSatisfaction from "./clientSatisfaction";
import MarketingCampaigns from "./marketingCampaigns";
import { useSelector } from 'react-redux';
import { myAxios } from 'utils/Interceptor';
import { useNavigate } from 'react-router-dom';

const ClientProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const clientSelected = useSelector((state) => state.clientSelected.clientSelected);

  const [isLoading, setIsLoading] = useState(false);
  const [completion, setCompletion] = useState({});

  const fetchCompletion = async () => {
    setIsLoading(true);
    try {
      const res = await myAxios.get(`/clients/completion/${clientSelected?.CUSTNO}`);
      setCompletion(res?.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error?.response?.data?.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCompletion();
  }, []);

  return (
    <Box p="1.5rem 2.5rem" position="relative" bgcolor={theme.palette.gray.first}>
      <FlexBetween>
        <Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
            onClick={() => navigate('/')}
          >
            <ArrowBack sx={{ color: theme.palette.blue.first, fontSize: "17px" }} />
            <Typography
              variant="h4"
              color={theme.palette.blue.first}
              fontWeight={100}
              fontSize={"17px"}
              sx={{ cursor: "pointer" }}
            >
              vers la liste des clients
            </Typography>
          </Box>
          <Typography
            variant="h2"
            color={theme.palette.blue.first}
            fontWeight="bold"
            sx={{ mt: 2 }}
          >
            Profil Client
          </Typography>
        </Box>
        {/* <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.blue.first,
              color: theme.palette.white.first,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: theme.palette.blue.first
              }
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Exporter
          </Button>
        </Box> */}
      </FlexBetween>

      {/* Render components when isLoading is false */}
      <Box mt={"24px"}>
        <DetailsStripe theme={theme} clientSelected={clientSelected} />
      </Box>

      <Box mt={"24px"}>
        <Grid container spacing={3}>
          <DataCompletion theme={theme} completion={completion} isLoading={isLoading} />
          <FinancialData theme={theme} completion={completion} clientSelected={clientSelected} />
        </Grid>
      </Box>

      <Box mt={"24px"}>
        <Grid container spacing={3}>
          <ClientPark theme={theme} clientSelected={clientSelected} />
          <SavTable theme={theme} clientSelected={clientSelected} />
        </Grid>
      </Box>

      <Box mt={"24px"} id="clientSatisfaction">
        <Grid container spacing={3}>
          <MarketingCampaigns theme={theme} clientSelected={clientSelected} />
          <ClientSatisfaction theme={theme} clientSelected={clientSelected} />
        </Grid>
      </Box>

    </Box>
  );
};

export default ClientProfile;
