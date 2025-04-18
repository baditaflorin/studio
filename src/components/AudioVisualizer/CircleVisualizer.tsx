"use client";

import { useEffect } from 'react';

interface CircleVisualizerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  audioData: Uint8Array;
  getColor: (index: number, total: number) => string;
}

const CircleVisualizer = ({ canvasRef, audioData, getColor }: CircleVisualizerProps) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawCircle = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const maxRadius = Math.min(centerX, centerY);

      for (let i = 0; i < audioData.length; i++) {
        const value = audioData[i];
        const angle = (i / audioData.length) * 2 * Math.PI;
        const radius = (value / 255) * maxRadius;

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, angle);
        ctx.fillStyle = getColor(i, audioData.length);
        ctx.fill();
      }
    };

    drawCircle();
  }, [canvasRef, audioData, getColor]);

  return null;
};

export default CircleVisualizer;
