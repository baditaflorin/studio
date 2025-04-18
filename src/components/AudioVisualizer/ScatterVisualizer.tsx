"use client";

import { useEffect } from 'react';

interface ScatterVisualizerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  audioData: Uint8Array;
  getColor: (index: number, total: number) => string;
}

const ScatterVisualizer = ({ canvasRef, audioData, getColor }: ScatterVisualizerProps) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawScatter = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      for (let i = 0; i < audioData.length; i++) {
        const value = audioData[i];
        // Correlate x and y with the audio data to reduce randomness
        const x = (i / audioData.length) * canvasWidth; // Spread points across the width
        const y = (value / 255) * canvasHeight; // Height based on audio value
        const size = value / 20;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fillStyle = getColor(i, audioData.length);
        ctx.fill();
      }
    };

    drawScatter();
  }, [canvasRef, audioData, getColor]);

  return null;
};

export default ScatterVisualizer;
