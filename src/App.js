import React from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "theme";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

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
import { decryptUser } from 'utils/EncryptedUser';

function App() {

  const theme = useMemo(() => createTheme(themeSettings()), []);
  const storedUser = decryptUser(localStorage.getItem("user"));
  const user = useSelector(selectCurrentUser) || storedUser;

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            {/* public routes */}
            <Route path="/login" element={<LoginRedirect />} />

            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route element={<Layout />}>
                <Route path="/" element={<ClientList />} />
                {isAdmin(user) && <Route path="/utilisateurs" element={<UserManagement />} />}
                <Route path="/clientprofile" element={<ClientProfile />} />
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
  const token = useSelector(selectCurrentToken) || storedToken;

  return token ? <Navigate to={"/"} replace /> : <Login />;
};