import React from "react";
import { useDispatch } from "react-redux";
import FlexBetween from "components/FlexBetween";
import { AppBar, IconButton, InputBase, Toolbar } from "@mui/material";
import { Menu as MenuIcon, Search } from "@mui/icons-material";
import { logOut } from "../features/auth/authSlice";
import { useTheme } from "@mui/system";
import LogoutIcon from '@mui/icons-material/Logout';


const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", color: theme.palette.text.primary }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
          <FlexBetween
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
            backgroundColor={theme.palette.background.alt}
          >
            <InputBase placeholder="Search..." sx={{ color: theme.palette.text.primary }} />
            <IconButton>
              <Search sx={{ color: theme.palette.text.primary }} />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={handleLogout}>
            <LogoutIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
