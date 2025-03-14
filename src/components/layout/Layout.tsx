
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={`flex-1 ${isMobile ? '' : 'ml-16 lg:ml-60'}`}>
        <Navbar />
        <main className="min-h-[calc(100vh-64px)]">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;
