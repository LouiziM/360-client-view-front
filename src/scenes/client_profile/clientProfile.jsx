import React, { useState, useEffect } from 'react';
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  ExpandCircleDown,
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
import { useLocation } from 'react-router-dom';

const ClientProfile = () => {
  const theme = useTheme();

  const location = useLocation();
  const { state } = location;

  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
    console.log("lols");
  };

  useEffect(() => {
    const handleScroll = () => {
      const satisfactionElement = document.getElementById("clientSatisfaction");
      if (satisfactionElement) {
        const { top, bottom } = satisfactionElement.getBoundingClientRect();
        if (top >= 0 && bottom <= window.innerHeight) {
          setShowScrollButton(true);
        } else {
          setShowScrollButton(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box p="1.5rem 2.5rem" position="relative" bgcolor={"#F2F2F2"}>
      <FlexBetween>
        <Header title="Profil client" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: theme.palette.secondary.light
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
        <DetailsStripe theme={theme} data={state} />
      </Box>

      <Box mt={"24px"}>
        <Grid container spacing={3}>
          <DataCompletion theme={theme} client={state} />
          <FinancialData theme={theme} />
        </Grid>
      </Box>

      <Box mt={"24px"}>
        <Grid container spacing={3}>
          <ClientPark theme={theme} />
          <SavTable theme={theme} />
        </Grid>
      </Box>

      <Box mt={"24px"} id="clientSatisfaction">
        <Grid container spacing={3}>
          <MarketingCampaigns theme={theme} />
          <ClientSatisfaction theme={theme} />
        </Grid>
      </Box>

      {showScrollButton && (
        <Box onClick={scrollToTop}>
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
          />
        </Box>
      )}
    </Box>
  );
};

export default ClientProfile;
