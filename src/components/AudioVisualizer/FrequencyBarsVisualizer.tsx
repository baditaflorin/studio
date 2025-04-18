"use client";

import { useEffect } from 'react';

interface FrequencyBarsVisualizerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  audioData: Uint8Array;
  getColor: (index: number, total: number) => string;
}

const FrequencyBarsVisualizer = ({ canvasRef, audioData, getColor }: FrequencyBarsVisualizerProps) => {
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

      // Iterate through the audio data to draw frequency bars
      for (let i = 0; i < audioData.length; i++) {
        const barHeight = audioData[i]; // Height of the bar corresponds to the frequency intensity
        ctx.fillStyle = getColor(i, audioData.length); // Color of the bar
        ctx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight); // Draw the bar
        x += barWidth; // Move to the next position
      }
    };

    drawFrequencyBars();
  }, [canvasRef, audioData, getColor]);

  return null;
};

export default FrequencyBarsVisualizer;
