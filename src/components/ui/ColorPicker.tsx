
import React, { useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { hslToHex } from "@/utils/colorUtils";
import { useLanguage } from "@/hooks/useLanguage";

interface ColorPickerProps {
  label: string;
  value: string; // HSL string format
  onChange: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
  const { t } = useLanguage();
  
  // Parse HSL values
  const [h, s, l] = value.split(" ").map(v => parseFloat(v));

  const handleHueChange = (values: number[]) => {
    const newH = values[0];
    onChange(`${newH} ${s}% ${l}%`);
  };

  const handleSaturationChange = (values: number[]) => {
    const newS = values[0];
    onChange(`${h} ${newS}% ${l}%`);
  };

  const handleLightnessChange = (values: number[]) => {
    const newL = values[0];
    onChange(`${h} ${s}% ${newL}%`);
  };

  const hexColor = hslToHex(h, s, l);

  return (
    <div className="space-y-4 p-4 border border-border/30 rounded-xl bg-card/30 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <div 
          className="w-8 h-8 rounded-full border border-border/50" 
          style={{ backgroundColor: hexColor }}
        />
      </div>
      
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-xs">{t("hue")}</span>
            <span className="text-xs">{Math.round(h)}°</span>
          </div>
          <Slider 
            value={[h]} 
            min={0} 
            max={359} 
            step={1} 
            onValueChange={handleHueChange}
            className="h-2"
          />
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-xs">{t("saturation")}</span>
            <span className="text-xs">{Math.round(s)}%</span>
          </div>
          <Slider 
            value={[s]} 
            min={0} 
            max={100} 
            step={1} 
            onValueChange={handleSaturationChange}
            className="h-2"
          />
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-xs">{t("lightness")}</span>
            <span className="text-xs">{Math.round(l)}%</span>
          </div>
          <Slider 
            value={[l]} 
            min={0} 
            max={100} 
            step={1} 
            onValueChange={handleLightnessChange}
            className="h-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
