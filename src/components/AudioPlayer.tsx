import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import WaveForm from "./WaveForm";

interface AudioPlayerProps {
  track: {
    id: string;
    title: string;
    artist: string;
    image: string;
    audioUrl: string;
  };
}

const AudioPlayer = ({ track }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current?.duration || 0);
      });

      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
    }
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="backdrop-blur-md bg-white/10 rounded-xl p-6 shadow-xl border border-white/20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative group w-48 h-48 flex-shrink-0">
            <Image
              src={track.image}
              alt={track.title}
              className="w-full h-full object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">
                {track.title}
              </h2>
              <p className="text-gray-600">{track.artist}</p>
            </div>

            <div className="space-y-4">
              <WaveForm
                audioUrl={track.audioUrl}
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={duration}
              />

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <button
                onClick={togglePlayPause}
                className="w-12 h-12 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors flex items-center justify-center text-white shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={track.audioUrl} />
    </div>
  );
};

export default AudioPlayer;
