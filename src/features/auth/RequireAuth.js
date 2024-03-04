import { useLocation, Navigate, Outlet } from "react-router-dom"
// import { useSelector } from "react-redux"
// import { selectCurrentToken } from "./authSlice"

const RequireAuth = () => {
    // const token = useSelector(selectCurrentToken)
    const location = useLocation()

    const storedToken = localStorage.getItem("authToken");

    return (
        storedToken
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    )
}
export default RequireAuth