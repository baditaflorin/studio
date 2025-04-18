"use client";

import { useEffect } from 'react';

interface FrequencyBarsVisualizerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  audioData: Uint8Array;
}

const FrequencyBarsVisualizer = ({ canvasRef, audioData }: FrequencyBarsVisualizerProps) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawFrequencyBars = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const barWidth = canvasWidth / audioData.length;
      let x = 0;

      for (let i = 0; i < audioData.length; i++) {
        const barHeight = audioData[i];
        ctx.fillStyle = 'hsl(var(--audio-visualizer-line))';
        ctx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);
        x += barWidth;
      }
    };

    drawFrequencyBars();
  }, [canvasRef, audioData]);

  return null;
};

export default FrequencyBarsVisualizer;
