'use client';

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ColorPaletteSelectorProps {
  setColorPalette: React.Dispatch<React.SetStateAction<string>>;
  colorPalette: string;
  setCustomColor: React.Dispatch<React.SetStateAction<string>>;
  customColor: string;
}

export const ColorPaletteSelector = ({ setColorPalette, colorPalette, setCustomColor, customColor }: ColorPaletteSelectorProps) => {
  return (
    <>
      <Label>Color Palette</Label>
      <RadioGroup defaultValue={colorPalette} onValueChange={palette => {
        setColorPalette(palette)
      }}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="defaultPalette" />
          <Label htmlFor="defaultPalette">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="rainbow" id="rainbowPalette" />
          <Label htmlFor="rainbowPalette">Rainbow</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="customPalette" />
          <Label htmlFor="customPalette">Custom</Label>
        </div>
      </RadioGroup>
    </>
  );
};
