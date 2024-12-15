import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { isAuth } from "@/isAuth";


export const ProtectedRoute = ({ children }) => {
    if (!isAuth()) {
        return <Navigate to="/login" />
    }
    return children;
}
export const AuthenticatedUser = ({ children }) => {
    if (isAuth()) {
        return <Navigate to="/" />
    }

    return children;
}

export const AdminRoute = ({ children }) => {
    const role = Cookies.get('role');
    if (!isAuth()) {
        return <Navigate to="/login" />
    }

    if (role !== "instructor") {
        return <Navigate to="/" />
    }

    return children;
}