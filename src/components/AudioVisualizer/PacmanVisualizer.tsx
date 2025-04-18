'use client';

import { useEffect } from 'react';

interface PacmanVisualizerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  audioData: Uint8Array;
  getColor: (index: number, total: number) => string;
  volumeThreshold?: number;
  sensitivity?: number;
}

const PacmanVisualizer = ({ canvasRef, audioData, getColor, volumeThreshold = 50, sensitivity = 50 }: PacmanVisualizerProps) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawPacman = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const radius = Math.min(centerX, centerY) / 2;

      // Calculate the average amplitude of the audio data
      const amplitude = audioData.reduce((sum, data) => sum + data, 0) / audioData.length;

      // Normalize amplitude to a 0-1 range and apply sensitivity and volume threshold
      const normalizedAmplitude = Math.max(0, Math.min(1, (amplitude - volumeThreshold) / sensitivity));

      // Animate the mouth opening based on the normalized amplitude
      const mouthAngle = Math.PI / 4 * normalizedAmplitude; // Up to 45 degrees open

      // Pacman's rotation (based on frequency - simplistic for now)
      const rotation = (audioData[0] / 255) * Math.PI; // Use the first frequency bin for rotation

      ctx.save(); // Save the current drawing state
      ctx.translate(centerX, centerY); // Move the drawing origin to the center
      ctx.rotate(rotation); // Apply rotation

      ctx.beginPath();
      ctx.arc(0, 0, radius, mouthAngle, 2 * Math.PI - mouthAngle); // Pacman's body
      ctx.lineTo(0, 0); // Connect back to the center to close the Pacman shape
      ctx.fillStyle = getColor(0, 1); // Pacman color
      ctx.fill();
      ctx.closePath();

      ctx.restore(); // Restore the drawing state
    };

    drawPacman();
  }, [canvasRef, audioData, getColor, volumeThreshold, sensitivity]);

  return null;
};

export default PacmanVisualizer;
