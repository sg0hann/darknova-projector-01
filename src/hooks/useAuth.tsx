
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";
import { useLanguage } from "./useLanguage";

export const useAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();

  const user = localStorage.getItem("user") 
    ? JSON.parse(localStorage.getItem("user")!) 
    : null;

  const isAuthenticated = user !== null;

  const logout = () => {
    localStorage.removeItem("user");
    toast({
      title: language === 'en' ? "Logged out" : "Sesión cerrada",
      description: language === 'en' 
        ? "You have been logged out successfully" 
        : "Has cerrado sesión exitosamente",
    });
    navigate("/");
  };

  // If user is authenticated and tries to access root, redirect to dashboard
  const redirectToDashboard = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  };

  return {
    user,
    isAuthenticated,
    logout,
    redirectToDashboard
  };
};
