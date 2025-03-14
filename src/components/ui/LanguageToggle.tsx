
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../hooks/useLanguage";
import { availableLanguages } from "../../utils/localization";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex bg-secondary rounded-md p-0.5">
      {availableLanguages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`relative px-3 py-1.5 text-sm font-medium rounded-[0.3rem] transition-colors`}
        >
          {language === lang.code && (
            <motion.div
              layoutId="languageIndicator"
              className="absolute inset-0 bg-primary rounded-[0.3rem] z-0"
              initial={false}
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <span className={`relative z-10 ${language === lang.code ? "text-white" : "text-foreground"}`}>
            {lang.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
