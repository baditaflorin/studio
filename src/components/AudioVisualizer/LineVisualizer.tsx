"use client";

import { useEffect } from 'react';

interface LineVisualizerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  audioData: Uint8Array;
  getColor: (index: number, total: number) => string;
}

const LineVisualizer = ({ canvasRef, audioData, getColor }: LineVisualizerProps) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawLine = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      ctx.lineWidth = 2;
      ctx.strokeStyle = getColor(0, 1);
      ctx.beginPath();

      const sliceWidth = canvasWidth / (audioData.length - 1);
      let x = 0;
      const centerY = canvasHeight / 2;

      for (let i = 0; i < audioData.length; i++) {
        const v = audioData[i] / 128.0; // Normalize the data to 0-1
        const y = centerY + (v - 0.5) * canvasHeight / 2; // Center the line and scale the amplitude

        if (i === 0) {
          ctx.moveTo(x, centerY); // Start at the center
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.stroke();
    };

    drawLine();
  }, [canvasRef, audioData, getColor]);

  return null;
};

export default LineVisualizer;
