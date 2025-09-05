import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    //cek apakah ada token di localStorage
    const token = localStorage.getItem("token");
    //klo ada token, izinin akses ke halaamn yang diminta (make <Outlet />)
    //klo gk ada token, arahin (redirect) ke halaman /login

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;