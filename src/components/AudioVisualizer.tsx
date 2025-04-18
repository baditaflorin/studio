"use client";

import { useEffect, useRef, useState } from 'react';
import { useToast } from "@/hooks/use-toast"

const AudioVisualizer = () => {
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast()
  const [visualizationStyle, setVisualizationStyle] = useState<'waveform' | 'frequencyBars' | 'scatter'>('waveform');

  useEffect(() => {
    const getMicrophone = async () => {
      try {
        console.log("Attempting to get microphone...");
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        console.log("Microphone stream obtained:", stream);
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);

        const renderFrame = () => {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);
          setAudioData(new Uint8Array(dataArray));
          animationFrameRef.current = requestAnimationFrame(renderFrame);
        };

        renderFrame();
      } catch (error) {
        console.error("Error accessing microphone:", error);
        toast({
          title: "Error",
          description: "Could not access microphone.",
          variant: "destructive",
        })
      }
    };

    getMicrophone();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [toast]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const audioDataExists = audioData !== null;

    if (!canvas || !audioDataExists) return;

    const draw = () => {
      if (!canvas) return;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      if (visualizationStyle === 'waveform') {
        drawWaveform(ctx, canvasWidth, canvasHeight, audioData!);
      } else if (visualizationStyle === 'frequencyBars') {
        drawFrequencyBars(ctx, canvasWidth, canvasHeight, audioData!);
      } else if (visualizationStyle === 'scatter') {
        drawScatterPlot(ctx, canvasWidth, canvasHeight, audioData!);
      }
    };

    draw();
  }, [audioData, visualizationStyle]);

  const drawWaveform = (ctx: CanvasRenderingContext2D, width: number, height: number, data: Uint8Array) => {
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#008080';
    ctx.beginPath();

    const sliceWidth = width / (data.length - 1);
    let x = 0;

    for (let i = 0; i < data.length; i++) {
      const v = data[i] / 128.0;
      const y = (v * height) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(width, height / 2);
    ctx.stroke();
  };

  const drawFrequencyBars = (ctx: CanvasRenderingContext2D, width: number, height: number, data: Uint8Array) => {
    const barWidth = width / data.length;
    let x = 0;

    for (let i = 0; i < data.length; i++) {
      const barHeight = data[i];
      ctx.fillStyle = '#008080';
      ctx.fillRect(x, height - barHeight, barWidth, barHeight);
      x += barWidth;
    }
  };

  const drawScatterPlot = (ctx: CanvasRenderingContext2D, width: number, height: number, data: Uint8Array) => {
    for (let i = 0; i < data.length; i++) {
      const angle = (i / data.length) * Math.PI * 2;
      const radius = data[i] / 255 * Math.min(width, height) / 2;
      const x = width / 2 + radius * Math.cos(angle);
      const y = height / 2 + radius * Math.sin(angle);

      ctx.fillStyle = '#008080';
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      className="bg-secondary rounded-md shadow-md"
    />
  );
};

export default AudioVisualizer;

    