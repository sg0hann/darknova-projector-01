
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import ColorPicker from "../ui/ColorPicker";
import { useLanguage } from "@/hooks/useLanguage";

const FontPanel: React.FC = () => {
  const { t } = useLanguage();
  const { fontSettings, applyTheme, themeColors } = useTheme();
  
  const fontFamilies = [
    { value: "Inter, sans-serif", label: "Inter" },
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "Verdana, sans-serif", label: "Verdana" },
    { value: "Roboto, sans-serif", label: "Roboto" },
    { value: "Playfair Display, serif", label: "Playfair Display" },
    { value: "monospace", label: "Monospace" },
  ];
  
  const fontSizes = [
    { value: "12px", label: t("small") },
    { value: "14px", label: t("medium") },
    { value: "16px", label: t("default") },
    { value: "18px", label: t("large") },
    { value: "20px", label: t("larger") },
  ];

  const handleFontFamilyChange = (value: string) => {
    applyTheme(themeColors, { ...fontSettings, family: value });
  };

  const handleFontSizeChange = (value: string) => {
    applyTheme(themeColors, { ...fontSettings, size: value });
  };

  const handleColorChange = (value: string) => {
    applyTheme(themeColors, { ...fontSettings, color: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="mb-2 block">{t("fontFamily")}</Label>
          <Select value={fontSettings.family} onValueChange={handleFontFamilyChange}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectFontFamily")} />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((font) => (
                <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2 block">{t("fontSize")}</Label>
          <Select value={fontSettings.size} onValueChange={handleFontSizeChange}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectFontSize")} />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size) => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2 block">{t("fontColor")}</Label>
          <ColorPicker 
            label={t("textColor")} 
            value={fontSettings.color}
            onChange={(value) => handleColorChange(value)}
          />
        </div>
      </div>

      <div className="border-t border-border pt-4 mt-4">
        <h3 className="text-sm font-medium mb-2">{t("preview")}</h3>
        <div 
          className="p-4 border border-border rounded-md" 
          style={{ 
            fontFamily: fontSettings.family,
            fontSize: fontSettings.size,
            color: `hsl(${fontSettings.color})`,
          }}
        >
          <p>{t("fontPreviewText")}</p>
          <p className="mt-2 font-bold">{t("fontPreviewBold")}</p>
          <p className="mt-2 italic">{t("fontPreviewItalic")}</p>
        </div>
      </div>
    </div>
  );
};

export default FontPanel;
