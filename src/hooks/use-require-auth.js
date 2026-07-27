import LoginModal from "../Pages/LoginPopup"
import { useLoginModal } from "../Store/useLoginModel"
import { useNavigate, useLocation } from "react-router-dom";
import { useCurrentUser } from "@/Features/Auth/auth.query";

export const useRequireAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data: user ,isLoading} = useCurrentUser();
     const { openModal } = useLoginModal()
    
 const enforceAuth =
   (action, mode = "modal") =>
   (...args) => {
  

     // Find if an event object exists in the arguments (usually the first argument in React events)
     const event = args[0];
     if (event && typeof event.preventDefault === "function") {
       event.preventDefault(); // Stops the page from reloading / submitting early
     }

     if (isLoading) return;

     if (user) {
      //  console.log(user);
       return action(...args);
     }

     if (mode === "modal") {
       openModal();
     } else if (mode === "redirect") {
       navigate("/login", { state: { from: location } });
     }
   };

     return { enforceAuth, isAuthenticated: !!user };
}