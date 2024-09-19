import Cookies from "js-cookie";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const token = Cookies.get("token_cdp");
  const location = useLocation();
  return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
