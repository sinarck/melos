import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

interface WaveFormProps {
  audioUrl: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

const WaveForm = ({ audioUrl, isPlaying, currentTime }: WaveFormProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!containerRef.current || !audioUrl) return;

    // Initialize WaveSurfer instance
    wavesurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#F1F0FB",
      progressColor: "#9b87f5",
      cursorColor: "transparent",
      barWidth: 3,
      barGap: 2,
      barRadius: 2,
      height: 96,
      normalize: false,
      backend: "WebAudio",
      minPxPerSec: 50,
      interact: false,
      fillParent: true,
    });

    // Load the audio file
    try {
      wavesurferRef.current.load(audioUrl);
    } catch (error) {
      console.error("Failed to load audio in WaveSurfer:", error);
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!wavesurferRef.current) return;

    if (isPlaying) {
      wavesurferRef.current.play();
    } else {
      wavesurferRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!wavesurferRef.current) return;

    const currentProgress = currentTime / (wavesurferRef.current.getDuration() || 1);
    wavesurferRef.current.seekTo(currentProgress);
  }, [currentTime]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden rounded-lg"
      style={{ touchAction: "none" }}
    />
  );
};

export default WaveForm;
