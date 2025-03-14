
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
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-300px] right-[-300px] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-[-300px] left-[-300px] w-[600px] h-[600px] rounded-full bg-accent/10 blur-[100px]" />
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
