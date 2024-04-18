// 3
import React from 'react';
import Login from './components/Login';
import RequireAuth from './features/auth/RequireAuth';
import { Outlet } from "react-router-dom"
import DashboardRoutes from './DashboardRoutes';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Outlet />}>
            <Route index element={<Login />} />
          </Route>

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/*" element={<DashboardRoutes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
