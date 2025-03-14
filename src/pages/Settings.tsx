
import React from "react";
import { motion } from "framer-motion";
import { User, Globe, Moon, Bell } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import LanguageToggle from "../components/ui/LanguageToggle";
import { fadeIn, pageTransition } from "../utils/animations";

const Settings = () => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="container mx-auto px-4 py-6"
    >
      <motion.h1 
        variants={fadeIn}
        className="text-2xl font-bold mb-6"
      >
        {t("settings")}
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Settings navigation */}
        <motion.div
          variants={fadeIn}
          className="bg-card border border-border rounded-lg overflow-hidden"
        >
          <nav>
            <ul>
              {[
                { icon: Globe, label: "language" },
                { icon: Moon, label: "theme" },
                { icon: User, label: "account" },
                { icon: Bell, label: "notifications" },
              ].map((item, index) => (
                <li key={index}>
                  <button
                    className={`w-full flex items-center px-4 py-3 hover:bg-secondary/30 transition-colors ${index === 0 ? 'bg-secondary/50' : ''}`}
                  >
                    <item.icon size={18} className="mr-3" />
                    <span>{t(item.label)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
        
        {/* Language settings panel */}
        <motion.div
          variants={fadeIn}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h2 className="text-xl font-medium mb-4">{t("language")}</h2>
          <p className="text-muted-foreground mb-6">
            Select your preferred language for the user interface.
          </p>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Interface Language</h3>
            <LanguageToggle />
          </div>
          
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-medium mb-3">Language Details</h3>
            <p className="text-sm text-muted-foreground">
              The application will automatically use your selected language for all interface elements, 
              including navigation, buttons, forms, and content. Your language preference is stored 
              in your browser and will be remembered for future visits.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;
