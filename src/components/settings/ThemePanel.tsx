
import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/hooks/useLanguage";
import ColorPicker from "../ui/ColorPicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FontPanel from "./FontPanel";

const ThemePanel: React.FC = () => {
  const { t } = useLanguage();
  const { themeColors, applyTheme, resetTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("colors");
  
  const handleColorChange = (key: keyof typeof themeColors, value: string) => {
    // Apply theme changes immediately when slider changes
    applyTheme({ ...themeColors, [key]: value });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium mb-4">{t("theme")}</h2>
        <p className="text-muted-foreground mb-6">
          {t("customizeTheme")}
        </p>
      </div>
      
      <Tabs defaultValue="colors" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="colors">{t("colors")}</TabsTrigger>
          <TabsTrigger value="typography">{t("typography")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ColorPicker 
              label={t("primaryColor")} 
              value={themeColors.primary}
              onChange={(value) => handleColorChange('primary', value)}
            />
            
            <ColorPicker 
              label={t("accentColor")} 
              value={themeColors.accent}
              onChange={(value) => handleColorChange('accent', value)}
            />
            
            <ColorPicker 
              label={t("background")} 
              value={themeColors.background1}
              onChange={(value) => handleColorChange('background1', value)}
            />
            
            <ColorPicker 
              label={t("cardBackground")} 
              value={themeColors.background2}
              onChange={(value) => handleColorChange('background2', value)}
            />
          </div>
          
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-medium mb-4">{t("preview")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="text-xs mb-2 text-muted-foreground">{t("uiElements")}</h4>
                <div className="flex flex-wrap gap-2">
                  <Button>
                    {t("save")}
                  </Button>
                  <Badge 
                    style={{ 
                      backgroundColor: `hsl(${themeColors.primary})`
                    }}
                  >
                    {t("badge")}
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs mb-2 text-muted-foreground">{t("cardExample")}</h4>
                <Card 
                  className="p-4" 
                  style={{ 
                    backgroundColor: `hsla(${themeColors.background2}, 0.8)`,
                    borderColor: `hsla(${themeColors.primary}, 0.2)`
                  }}
                >
                  <h3 className="text-sm font-medium">{t("cardTitle")}</h3>
                  <p className="text-xs text-muted-foreground">
                    {t("cardDescription")}
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="typography">
          <FontPanel />
        </TabsContent>
      </Tabs>
      
      <Alert className="mb-6">
        <AlertDescription>
          {t("themeChangesApplied")}
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-end">
        <Button variant="outline" onClick={resetTheme}>
          {t("resetToDefault")}
        </Button>
      </div>
    </div>
  );
};

export default ThemePanel;
