import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronRightOutlined,
  AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoImage from "assets/logo.jpg";
import GroupsIcon from '@mui/icons-material/Groups';
import MapIcon from '@mui/icons-material/Map';

const navItems = [
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined sx={{ color: "#FFF" }} />,
  },
  {
    text: "Clients",
    icon: <GroupsIcon sx={{ color: "#FFF" }} />
  },
  {
    text: "Map",
    icon: <MapIcon sx={{ color: "#FFF" }} />
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {

              backgroundColor: theme.palette.secondary[700],
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">


            <Box
              mt={7}
              mb={3}
              component="img"
              alt="profile"
              src={logoImage}
              height="110px"
              width="190px"
              borderRadius="10px"
              sx={{
                objectFit: "cover",
                marginLeft: "10%"
              }}
            />

            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        color: "#FFF"
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color: "#FFF"

                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{
                          "& span": {
                            fontWeight: active === lcText && "bold"
                          }
                        }}
                      />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>


        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
