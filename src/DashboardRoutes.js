// DashboardRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { MyProSidebarProvider } from './pages/global/sidebar/sidebarContext';
import Topbar from './pages/global/Topbar';
import Dashboard from './pages/dashboard';
import Team from './pages/team';
import Invoices from './pages/invoices';
import Clients from './pages/clients';
import Form from './pages/form';
import Calendar from './pages/calendar';
import Bar from './pages/bar';
import Line from './pages/line';
import Pie from './pages/pie';
import FAQ from './pages/faq';
import Users from './pages/users/index.tsx'
import Geography from './pages/geography';


function DashboardRoutes() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Routes>
                <Route path="/dash" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/team" element={<Team />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default DashboardRoutes;
