import { Navigate, useLocation } from "react-router-dom";
import { useCurrentUser } from "@/Features/Auth/auth.query";


export const ProtectedRoutes = ({ children }) => {
    const { data: user, isLoading ,isError} = useCurrentUser();
    const location = useLocation(); 

    if (isLoading) {
        return <div>Verifying authorization...</div>;
    }
   if (isError || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }   
    return children;
    
}