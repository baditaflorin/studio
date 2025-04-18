"use client";

import { useEffect } from 'react';

interface WaveformVisualizerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  audioData: Uint8Array;
  getColor: (index: number, total: number) => string;
}

const WaveformVisualizer = ({ canvasRef, audioData, getColor }: WaveformVisualizerProps) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawWaveform = () => {
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

      for (let i = 0; i < audioData.length; i++) {
        const v = audioData[i] / 128.0;
        const y = (v * canvasHeight) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvasWidth, canvasHeight / 2);
      ctx.stroke();
    };

    drawWaveform();
  }, [canvasRef, audioData, getColor]);

  return null;
};

export default WaveformVisualizer;
