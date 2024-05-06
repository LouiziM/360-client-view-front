import React from 'react';
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
} from "@mui/icons-material";
import {
  Grid,
  Box,
  Button,
  useTheme,
} from "@mui/material";
import DetailsStripe from "./detailsStripe";
import DataCompletion from "./dataCompletion";
import FinancialData from "./financialDetails";
import ClientPark from "./clientPark";
import SavTable from "./savTable";
import ClientSatisfaction from "./clientSatisfaction";
import MarketingCampaigns from "./marketingCampaigns";
import { useGetCompletionQuery } from 'features/state/clientApiSlice';
import { useSelector } from 'react-redux';

const ClientProfile = () => {
  const theme = useTheme();
  const clientSelected = useSelector((state) => state.clientSelected.clientSelected);

  const { data: completion, isLoading } = useGetCompletionQuery(clientSelected?.CUSTNO);

  return (
    <Box p="1.5rem 2.5rem" position="relative" bgcolor={theme.palette.gray.first}>
      <FlexBetween>
        <Header title="Profil client" />
        <Box>
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
        </Box>
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
          <MarketingCampaigns theme={theme} />
          <ClientSatisfaction theme={theme} />
        </Grid>
      </Box>

    </Box>
  );
};

export default ClientProfile;
