
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/hooks/useLanguage";
import ColorPicker from "../ui/ColorPicker";
import { hslToHex } from "@/utils/colorUtils";

const ThemePanel: React.FC = () => {
  const { t } = useLanguage();
  const { themeColors, applyTheme, resetTheme } = useTheme();
  const [tempColors, setTempColors] = React.useState({ ...themeColors });
  
  const handleColorChange = (key: keyof typeof tempColors, value: string) => {
    setTempColors(prev => ({ ...prev, [key]: value }));
  };
  
  const handleApplyTheme = () => {
    applyTheme(tempColors);
  };
  
  const handleResetTheme = () => {
    resetTheme();
    setTempColors({ ...themeColors });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium mb-4">{t("theme")}</h2>
        <p className="text-muted-foreground mb-6">
          Customize the appearance of the application by adjusting colors to match your preferences.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ColorPicker 
          label="Primary Color" 
          value={tempColors.primary}
          onChange={(value) => handleColorChange('primary', value)}
        />
        
        <ColorPicker 
          label="Accent Color" 
          value={tempColors.accent}
          onChange={(value) => handleColorChange('accent', value)}
        />
        
        <ColorPicker 
          label="Background" 
          value={tempColors.background1}
          onChange={(value) => handleColorChange('background1', value)}
        />
        
        <ColorPicker 
          label="Card Background" 
          value={tempColors.background2}
          onChange={(value) => handleColorChange('background2', value)}
        />
      </div>
      
      <div className="border-t border-border pt-6">
        <h3 className="text-sm font-medium mb-4">Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="text-xs mb-2 text-muted-foreground">UI Elements</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                style={{ 
                  '--primary': tempColors.primary,
                  '--accent': tempColors.accent 
                } as React.CSSProperties}
              >
                Button
              </Button>
              <Badge 
                style={{ 
                  backgroundColor: `hsl(${tempColors.primary})`
                }}
              >
                Badge
              </Badge>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs mb-2 text-muted-foreground">Card Example</h4>
            <Card 
              className="p-4" 
              style={{ 
                backgroundColor: `hsla(${tempColors.background2}, 0.8)`,
                borderColor: `hsla(${tempColors.primary}, 0.2)`
              }}
            >
              <h3 className="text-sm font-medium">Card Title</h3>
              <p className="text-xs text-muted-foreground">
                This is how card elements will appear with your chosen theme.
              </p>
            </Card>
          </div>
        </div>
        
        <Alert className="mb-6">
          <AlertDescription>
            Color changes will affect the entire application and will be saved to your browser.
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={handleResetTheme}>
            Reset to Default
          </Button>
          <Button onClick={handleApplyTheme}>
            Apply Theme
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThemePanel;
