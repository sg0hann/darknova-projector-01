
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../hooks/useLanguage";
import { availableLanguages } from "../../utils/localization";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="inline-flex bg-secondary/80 backdrop-blur-md rounded-md p-0.5 border border-border/30 shadow-lg"
    >
      {availableLanguages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`relative px-3 py-1.5 text-sm font-medium rounded-[0.3rem] transition-colors`}
        >
          {language === lang.code && (
            <motion.div
              layoutId="languageIndicator"
              className="absolute inset-0 bg-primary rounded-[0.3rem] z-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              initial={false}
              transition={{ 
                type: "spring", 
                duration: 0.5,
                bounce: 0.2
              }}
            />
          )}
          <span className={`relative z-10 ${language === lang.code ? "text-white" : "text-foreground"}`}>
            {lang.name}
          </span>
        </button>
      ))}
    </motion.div>
  );
};

export default LanguageToggle;
