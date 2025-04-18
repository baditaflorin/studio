"use client";

import { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ColorPaletteSelector } from './ColorPaletteSelector';
import { Input } from "@/components/ui/input"

interface CustomizationSidebarProps {
  setVisualizationStyle: React.Dispatch<React.SetStateAction<'waveform' | 'frequencyBars' | 'line' | 'scatter' | 'circle'>>;
  visualizationStyle: 'waveform' | 'frequencyBars' | 'line' | 'scatter' | 'circle';
  setColorPalette: React.Dispatch<React.SetStateAction<string>>;
  colorPalette: string;
  setCustomColor: React.Dispatch<React.SetStateAction<string>>;
  customColor: string;
}


const CustomizationSidebar = ({ setVisualizationStyle, visualizationStyle, setColorPalette, colorPalette, setCustomColor, customColor }: CustomizationSidebarProps) => {

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <h4 className="font-semibold text-md">Visualization Options</h4>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Label>Visualization Style</Label>
            <RadioGroup defaultValue={visualizationStyle} onValueChange={style => {
              setVisualizationStyle(style as 'waveform' | 'frequencyBars' | 'line' | 'scatter' | 'circle')
            }}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="waveform" id="waveform" />
                <Label htmlFor="waveform">Waveform</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="frequencyBars" id="frequencyBars" />
                <Label htmlFor="frequencyBars">Frequency Bars</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="line" id="line" />
                <Label htmlFor="line">Line</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scatter" id="scatter" />
                <Label htmlFor="scatter">Scatter</Label>
              </div>
               <div className="flex items-center space-x-2">
                <RadioGroupItem value="circle" id="circle" />
                <Label htmlFor="circle">Circle</Label>
              </div>
            </RadioGroup>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ColorPaletteSelector setColorPalette={setColorPalette} colorPalette={colorPalette} setCustomColor={setCustomColor} customColor={customColor}/>
            {colorPalette === 'custom' && (
              <>
                <Label htmlFor="customColorInput">Custom Color</Label>
                <Input
                  type="color"
                  id="customColorInput"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                />
              </>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default CustomizationSidebar;
