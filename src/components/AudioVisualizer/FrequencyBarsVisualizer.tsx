"use client";

import { useEffect } from 'react';

interface FrequencyBarsVisualizerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  audioData: Uint8Array;
  getColor: (index: number, total: number) => string;
  analyser: AnalyserNode | null;
}

const FrequencyBarsVisualizer = ({ canvasRef, audioData, getColor, analyser }: FrequencyBarsVisualizerProps) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !analyser) return;

    const drawFrequencyBars = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      analyser.getByteFrequencyData(dataArray);

      const barWidth = (canvasWidth / bufferLength);
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        const color = getColor(i, bufferLength);
        ctx.fillStyle = color;

        // Draw the bar
        ctx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);

        x += barWidth;
      }
    };

    drawFrequencyBars();
  }, [canvasRef, audioData, getColor, analyser]);

  return null;
};

export default FrequencyBarsVisualizer;
