"use client";

import { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CustomizationSidebarProps {
  setVisualizationStyle: React.Dispatch<React.SetStateAction<'waveform' | 'frequencyBars' | 'line'>>;
  visualizationStyle: 'waveform' | 'frequencyBars' | 'line';
}


const CustomizationSidebar = ({ setVisualizationStyle, visualizationStyle }: CustomizationSidebarProps) => {


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
              console.log('Radio button clicked, new style:', style);
              setVisualizationStyle(style as 'waveform' | 'frequencyBars' | 'line')
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
            </RadioGroup>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default CustomizationSidebar;
