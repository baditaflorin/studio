"use client";

import { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const CustomizationSidebar = () => {
  const [visualizationStyle, setVisualizationStyle] = useState<'waveform' | 'frequencyBars' | 'scatter'>('waveform');

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <h4 className="font-semibold text-md">Visualization Options</h4>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Label>Visualization Style</Label>
            <RadioGroup defaultValue={visualizationStyle} onValueChange={style => setVisualizationStyle(style as 'waveform' | 'frequencyBars' | 'scatter')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="waveform" id="waveform" />
                <Label htmlFor="waveform">Waveform</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="frequencyBars" id="frequencyBars" />
                <Label htmlFor="frequencyBars">Frequency Bars</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scatter" id="scatter" />
                <Label htmlFor="scatter">Scatter Plot</Label>
              </div>
            </RadioGroup>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default CustomizationSidebar;
