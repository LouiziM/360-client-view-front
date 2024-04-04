import React from 'react';
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  ExpandCircleDown,
} from "@mui/icons-material";
import {
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
import { useLocation } from 'react-router-dom';

const ClientProfile = () => {
  const theme = useTheme();

  const location = useLocation();
  const { state } = location;





  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box m="1.5rem 2.5rem" position="relative">
      <FlexBetween>
        <Header title="Profil client"/>

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Exporter
          </Button>
        </Box>
      </FlexBetween>

        
   
          {/* Render components when isLoading is false */}
          <DetailsStripe theme={theme} data={state} />

          <Box display="flex" flexDirection="row" gap={5}   >
            <DataCompletion theme={theme} client={state}/>
            <FinancialData theme={theme} />
          </Box>
          <Box display="flex" flexDirection="row" gap={5}   >
            <ClientPark theme={theme} />
            <SavTable theme={theme} />
          </Box>

          <Box display="flex" flexDirection="row" gap={5}   >
            <MarketingCampaigns theme={theme} />
            <ClientSatisfaction theme={theme} />
          </Box>

          <ExpandCircleDown
            sx={{
              position: "fixed",
              bottom: "10px",
              right: "10px",
              transform: "rotate(180deg)",
              color: theme.palette.secondary.light,
              fontSize: "4rem",
              cursor: "pointer",
            }}
            onClick={scrollToTop}
          />
    </Box>
  );
};

export default ClientProfile;
