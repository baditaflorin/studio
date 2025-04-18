'use client';

import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import WaveformVisualizer from './WaveformVisualizer';
import FrequencyBarsVisualizer from './FrequencyBarsVisualizer';
import LineVisualizer from './LineVisualizer';
import ScatterVisualizer from './ScatterVisualizer';
import CircleVisualizer from './CircleVisualizer';
import PacmanVisualizer from './PacmanVisualizer';

interface AudioVisualizerProps {
  visualizationStyle: 'waveform' | 'frequencyBars' | 'line' | 'scatter' | 'circle' | 'pacman';
  colorPalette: string;
  customColor: string;
  volumeThreshold?: number;
  sensitivity?: number;
}

const AudioVisualizer = ({
  visualizationStyle,
  colorPalette,
  customColor,
  volumeThreshold = 50,
  sensitivity = 50,
}: AudioVisualizerProps) => {
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getMicrophone = async () => {
      try {
        console.log('Attempting to get microphone...');
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 2048;
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        console.log('Microphone stream obtained:', stream);
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
        console.error('Error accessing microphone:', error);
        toast({
          title: 'Error',
          description: 'Could not access microphone.',
          variant: 'destructive',
        });
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

  const getColor = (index: number, total: number) => {
    if (colorPalette === 'custom') {
      return customColor;
    } else if (colorPalette === 'rainbow') {
      const hue = (index / total) * 360;
      return `hsl(${hue}, 100%, 50%)`;
    } else {
      return 'hsl(var(--audio-visualizer-line))';
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      className="bg-audio-visualizer-bg rounded-md shadow-md"
    >
      {audioData && visualizationStyle === 'waveform' && (
        <WaveformVisualizer
          canvasRef={canvasRef}
          audioData={audioData}
          getColor={getColor}
          volumeThreshold={volumeThreshold}
          sensitivity={sensitivity}
        />
      )}
      {audioData && visualizationStyle === 'frequencyBars' && (
        <FrequencyBarsVisualizer
          canvasRef={canvasRef}
          audioData={audioData}
          getColor={getColor}
          analyser={analyserRef.current}
        />
      )}
      {audioData && visualizationStyle === 'line' && (
        <LineVisualizer
          canvasRef={canvasRef}
          audioData={audioData}
          getColor={getColor}
          volumeThreshold={volumeThreshold}
          sensitivity={sensitivity}
        />
      )}
      {audioData && visualizationStyle === 'scatter' && (
        <ScatterVisualizer
          canvasRef={canvasRef}
          audioData={audioData}
          getColor={getColor}
          volumeThreshold={volumeThreshold}
          sensitivity={sensitivity}
        />
      )}
      {audioData && visualizationStyle === 'circle' && (
        <CircleVisualizer
          canvasRef={canvasRef}
          audioData={audioData}
          getColor={getColor}
          volumeThreshold={volumeThreshold}
          sensitivity={sensitivity}
        />
      )}
      {audioData && visualizationStyle === 'pacman' && (
        <PacmanVisualizer
          canvasRef={canvasRef}
          audioData={audioData}
          getColor={getColor}
          volumeThreshold={volumeThreshold}
          sensitivity={sensitivity}
        />
      )}
    </canvas>
  );
};

export default AudioVisualizer;
