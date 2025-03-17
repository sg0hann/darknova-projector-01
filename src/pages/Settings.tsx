
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Globe, Moon, Bell } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { fadeIn, pageTransition } from "../utils/animations";
import ThemePanel from "@/components/settings/ThemePanel";

const Settings = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("language");
  
  const tabs = [
    { icon: Globe, label: "language", id: "language" },
    { icon: Moon, label: "theme", id: "theme" },
    { icon: User, label: "account", id: "account" },
    { icon: Bell, label: "notifications", id: "notifications" },
  ];
  
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
              {tabs.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 hover:bg-secondary/30 transition-colors ${activeTab === item.id ? 'bg-secondary/50' : ''}`}
                  >
                    <item.icon size={18} className="mr-3" />
                    <span>{t(item.label)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
        
        {/* Settings content panel */}
        <motion.div
          variants={fadeIn}
          className="bg-card border border-border rounded-lg p-6"
        >
          {activeTab === "language" && (
            <>
              <h2 className="text-xl font-medium mb-4">{t("language")}</h2>
              <p className="text-muted-foreground mb-6">
                Select your preferred language for the user interface.
              </p>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Interface Language</h3>
                <div className="flex items-center gap-2">
                  {/* Show LanguageToggle component */}
                  <div className="inline-block">
                    <LanguageToggle />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-medium mb-3">Language Details</h3>
                <p className="text-sm text-muted-foreground">
                  The application will automatically use your selected language for all interface elements, 
                  including navigation, buttons, forms, and content. Your language preference is stored 
                  in your browser and will be remembered for future visits.
                </p>
              </div>
            </>
          )}
          
          {activeTab === "theme" && <ThemePanel />}
          
          {activeTab === "account" && (
            <div>
              <h2 className="text-xl font-medium mb-4">{t("account")}</h2>
              <p className="text-muted-foreground">Account settings coming soon.</p>
            </div>
          )}
          
          {activeTab === "notifications" && (
            <div>
              <h2 className="text-xl font-medium mb-4">{t("notifications")}</h2>
              <p className="text-muted-foreground">Notification settings coming soon.</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;
