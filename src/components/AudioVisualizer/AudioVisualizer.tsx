"use client";

import { useEffect, useRef, useState } from 'react';
import { useToast } from "@/hooks/use-toast"
import WaveformVisualizer from './WaveformVisualizer';
import FrequencyBarsVisualizer from './FrequencyBarsVisualizer';
import LineVisualizer from './LineVisualizer';

interface AudioVisualizerProps {
  visualizationStyle: 'waveform' | 'frequencyBars' | 'line';
}

const AudioVisualizer = ({ visualizationStyle }: AudioVisualizerProps) => {
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { toast } = useToast()

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
          analyserRef.current.getByteTimeDomainData(dataArray);
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

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      className="bg-audio-visualizer-bg rounded-md shadow-md"
    >
      {visualizationStyle === 'waveform' && audioData && (
        <WaveformVisualizer canvasRef={canvasRef} audioData={audioData} />
      )}
      {visualizationStyle === 'frequencyBars' && audioData && (
        <FrequencyBarsVisualizer canvasRef={canvasRef} audioData={audioData} />
      )}
      {visualizationStyle === 'line' && audioData && (
        <LineVisualizer canvasRef={canvasRef} audioData={audioData} />
      )}
    </canvas>
  );
};

export default AudioVisualizer;
