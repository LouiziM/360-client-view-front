// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import RequireAuth from './features/auth/RequireAuth';
import Layout from './components/Layout';
import DashboardRoutes from './DashboardRoutes';

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
      </Route>

      {/* protected routes */}
      <Route  element={<RequireAuth />}>
        <Route path="/*" element={<DashboardRoutes />} />
      </Route>
    </Routes>
  );
}

export default App;
