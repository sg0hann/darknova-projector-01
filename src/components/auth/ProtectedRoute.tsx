
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const isAuthenticated = localStorage.getItem("user") !== null;

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: language === 'en' ? "Authentication required" : "Autenticación requerida",
        description: language === 'en' 
          ? "You must be logged in to access this page" 
          : "Debes iniciar sesión para acceder a esta página",
      });
    }
  }, [isAuthenticated, toast, language]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
