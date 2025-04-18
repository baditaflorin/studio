'use client';

import AudioVisualizer from '@/components/AudioVisualizer/AudioVisualizer';
import CustomizationSidebar from '@/components/CustomizationSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useState } from 'react';

export default function Home() {
  const [visualizationStyle, setVisualizationStyle] = useState<'waveform' | 'frequencyBars' | 'line'>('line');

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-background">
        <CustomizationSidebar setVisualizationStyle={setVisualizationStyle} visualizationStyle={visualizationStyle}/>
        <main className="flex-1 flex items-center justify-center">
          <AudioVisualizer visualizationStyle={visualizationStyle}/>
        </main>
      </div>
    </SidebarProvider>
  );
}


