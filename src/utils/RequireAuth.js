import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";


const storedToken = localStorage.getItem("authToken");


const RequireAuth = () => {
  const token = useSelector(selectCurrentToken)||storedToken;
  const location = useLocation();
  return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
