'use client';

import AudioVisualizer from '@/components/AudioVisualizer/AudioVisualizer';
import CustomizationSidebar from '@/components/CustomizationSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useState } from 'react';

export default function Home() {
  const [visualizationStyle, setVisualizationStyle] = useState<'waveform' | 'frequencyBars' | 'line' | 'scatter' | 'circle' | 'pacman'>('line');
  const [colorPalette, setColorPalette] = useState<string>('rainbow');
  const [customColor, setCustomColor] = useState<string>('#008080');
  const [volumeThreshold, setVolumeThreshold] = useState<number>(50);
  const [sensitivity, setSensitivity] = useState<number>(50);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-background">
        <CustomizationSidebar
          setVisualizationStyle={setVisualizationStyle}
          visualizationStyle={visualizationStyle}
          setColorPalette={setColorPalette}
          colorPalette={colorPalette}
          setCustomColor={setCustomColor}
          customColor={customColor}
          setVolumeThreshold={setVolumeThreshold}
          volumeThreshold={volumeThreshold}
          setSensitivity={setSensitivity}
          sensitivity={sensitivity}
        />
        <main className="flex-1 flex items-center justify-center">
          <AudioVisualizer
            visualizationStyle={visualizationStyle}
            colorPalette={colorPalette}
            customColor={customColor}
            volumeThreshold={volumeThreshold}
            sensitivity={sensitivity}
          />
        </main>
      </div>
    </SidebarProvider>
  );
}

