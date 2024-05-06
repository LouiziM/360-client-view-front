import React from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "theme";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";

import Login from './components/Login';
import RequireAuth from './utils/RequireAuth';
import Layout from "scenes/layout";
import UserManagement from "scenes/admin/index";
import ClientProfile from "scenes/client_profile/clientProfile";
import ClientList from "scenes/clients/clientList";
import NotFound from 'NotFound';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from 'features/auth/authSlice';
import { isAdmin } from 'utils/Roles';

function App() {

  const theme = useMemo(() => createTheme(themeSettings()), []);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            {/* public routes */}
            <Route path="/" element={<LoginRedirect />} />

            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route element={<Layout />}>
                {isAdmin(user|| storedUser) && <Route path="/utilisateurs" element={<UserManagement />} />}
                {!isAdmin(user|| storedUser) &&
                  <>
                    <Route path="/clientprofile" element={<ClientProfile />} />
                    <Route path="/clients" element={<ClientList />} />
                  </>
                }
              </Route>
            </Route>

            <Route path="/*" element={<NotFound />} />
          </Routes>

        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

const LoginRedirect = () => {
  const storedToken = localStorage.getItem("authToken");
  const token = useSelector(selectCurrentToken);

  const storedUser = localStorage.getItem("user");
  const user = useSelector(selectCurrentUser); 

  return token||storedToken ? <Navigate to={isAdmin(user||storedUser) ? "/utilisateurs" : "/clients"} replace /> : <Login />;
};