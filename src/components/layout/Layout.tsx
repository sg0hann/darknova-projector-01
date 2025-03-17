
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
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient elements with subtle animation */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          initial={{ x: -100, y: -100, opacity: 0.5 }}
          animate={{ 
            x: [-100, 50, -150, -100],
            y: [-100, -200, -50, -100],
            opacity: [0.5, 0.7, 0.5, 0.5],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 25,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" 
        />
        <motion.div 
          initial={{ x: 100, y: 100, opacity: 0.5 }}
          animate={{ 
            x: [100, 150, 0, 100],
            y: [100, 0, 200, 100],
            opacity: [0.5, 0.7, 0.5, 0.5],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 20,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]" 
        />
      </div>
      
      <Sidebar />
      
      <div className={`flex-1 ${isMobile ? '' : 'ml-16 lg:ml-60'}`}>
        <Navbar />
        <main className="min-h-[calc(100vh-64px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="p-4 md:p-6 h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      
      {/* Grid overlay for futuristic effect */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
    </div>
  );
};

export default Layout;
