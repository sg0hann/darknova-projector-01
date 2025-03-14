
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../../hooks/useLanguage";
import { 
  LayoutDashboard, 
  FolderKanban, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  PlusCircle
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const sidebarLinks = [
  { path: "/dashboard", icon: LayoutDashboard, label: "dashboard" },
  { path: "/projects", icon: FolderKanban, label: "projects" },
  { path: "/analytics", icon: BarChart3, label: "analytics" },
  { path: "/settings", icon: Settings, label: "settings" },
];

const Sidebar = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarVariants = {
    open: { 
      width: isMobile ? "100%" : "240px", 
      transition: { duration: 0.3, ease: "easeOut" } 
    },
    closed: { 
      width: isMobile ? "0" : "64px", 
      transition: { duration: 0.3, ease: "easeOut" } 
    },
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar toggle for mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-30 p-2 rounded-md bg-secondary text-white md:hidden"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <motion.div
        className={`fixed top-0 left-0 h-full bg-card border-r border-border z-20 overflow-hidden ${isMobile ? (isOpen ? "block" : "hidden") : "block"}`}
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
        initial={isMobile ? "closed" : "open"}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <motion.div 
              animate={{ opacity: isOpen ? 1 : 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="font-bold text-white">P</span>
              </div>
              {isOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-bold text-lg"
                >
                  Productify
                </motion.span>
              )}
            </motion.div>
            
            {!isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-md hover:bg-secondary/50 transition-colors"
                aria-label="Toggle sidebar"
              >
                {isOpen ? 
                  <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.9 }}>
                    <Menu size={20} />
                  </motion.div> : 
                  <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.9 }}>
                    <Menu size={20} />
                  </motion.div>
                }
              </button>
            )}
          </div>

          <nav className="flex-1 py-6 px-2 overflow-y-auto scrollbar-hide">
            <ul className="space-y-2">
              {sidebarLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => `
                      flex items-center py-2 px-3 rounded-md transition-colors
                      ${isActive ? 'bg-primary text-white' : 'hover:bg-secondary/50 text-foreground'}
                    `}
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    <link.icon size={20} className="flex-shrink-0" />
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="ml-3 font-medium"
                      >
                        {t(link.label)}
                      </motion.span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {isOpen && (
            <div className="p-4 border-t border-border mt-auto">
              <button className="w-full flex items-center justify-center py-2 px-4 rounded-md bg-primary hover:bg-primary/90 text-white font-medium transition-colors">
                <PlusCircle size={18} className="mr-2" />
                {t("newProject")}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
