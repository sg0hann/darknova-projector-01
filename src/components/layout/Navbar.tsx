
import React from "react";
import { Bell, Search, User } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../../hooks/useLanguage";
import { availableLanguages } from "../../utils/localization";

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card/50 backdrop-blur-lg border-b border-border sticky top-0 z-10"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex-1 md:flex md:ml-16 hidden">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="search"
              placeholder={t("searchProjects")}
              className="w-full py-2 pl-10 pr-4 rounded-md bg-secondary/50 border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none px-3 py-1.5 rounded-md bg-secondary/50 border border-border text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
            >
              {availableLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-secondary/50 hover:bg-secondary/80 transition-colors relative"
          >
            <Bell size={18} />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-primary"></span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1 rounded-full bg-primary/10 border border-primary/20"
          >
            <User size={24} className="text-primary" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
