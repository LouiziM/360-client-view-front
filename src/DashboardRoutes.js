import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {  Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Admin from "scenes/admin/index.tsx";
import ClientProfile from "scenes/client_profile/clientProfile";
import ClientList from "scenes/playground/clientList";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/clientprofile" element={<ClientProfile />} />
            <Route path="/playground" element={<ClientList />} />
            </Route>
          </Routes>
        </ThemeProvider>
     
  );
}

export default App;
