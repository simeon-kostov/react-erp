import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";


export const RouteGuard = ({
    children,
}) => {
    const { userToken, userProfileInfo } = useContext(AuthContext);

    if (!userProfileInfo || !userToken) {
        return <Navigate to="/" />;
    }

    return children ? children : <Outlet />
};