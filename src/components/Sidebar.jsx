import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import { useSelector } from "react-redux";
import { selectCurrentUser } from "features/auth/authSlice";
import { isAdmin, isUser } from "utils/Roles";
import { decryptUser } from "utils/EncryptedUser";

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const storedUser = decryptUser(localStorage.getItem("user"));
  const user = useSelector(selectCurrentUser) || storedUser;

  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const navItems = [
    {
      text: "Clients",
      link: "/",
      canAccess: (isAdmin(user) || isUser(user)),
      icon: <GroupsIcon sx={{ color: theme.palette.white.first }} />
    },
    {
      text: "Utilisateurs",
      link: "/utilisateurs",
      canAccess: isAdmin(user),
      icon: <AdminPanelSettingsOutlined sx={{ color: theme.palette.white.first }} />,
    }
  ];

  useEffect(() => {
    setActive(pathname);
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
              backgroundColor: theme.palette.blue.first,
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
              {navItems?.map((element, index) => {
                return (
                  <>
                    {element?.canAccess &&
                      <ListItem key={index} disablePadding>
                        <ListItemButton
                          onClick={() => {
                            navigate(element?.link);
                            setActive(element?.link);
                          }}
                          sx={{ color: theme.palette.white.first }}
                        >
                          <ListItemIcon sx={{ ml: "2rem", color: theme.palette.white.first }}>
                            {element?.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={element?.text}
                            sx={{
                              "& span": {
                                fontWeight: active === element?.link && "bold"
                              }
                            }}
                          />
                          {active === element?.link && (
                            <ChevronRightOutlined sx={{ ml: "auto" }} />
                          )}
                        </ListItemButton>
                      </ListItem>
                    }
                  </>
                )
              })}
            </List>
          </Box>


        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
