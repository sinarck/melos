import { useState, useRef, useEffect } from "react";
import {
  Upload,
  Play,
  Pause,
  Share2,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import AudioPlayer from "@/components/AudioPlayer";
import WaveForm from "@/components/WaveForm";

interface Song {
  id: string;
  title: string;
  artist: string;
  image: string;
  audioUrl: string;
}

const defaultSong: Song = {
  id: "default",
  title: "Default Song Title",
  artist: "Default Artist",
  image: "https://via.placeholder.com/150",
  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
};

const loadingMessages = [
  "Retrieving your image — just a moment!",
  '"A cozy house with a bonfire and s\'mores"',
  "Finding songs matching image vibe description",
  "Displaying your songs",
];

export default function ImagePlayground() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [aiGeneratedTrack, setAiGeneratedTrack] = useState<Song | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isUploading) {
      const interval = setInterval(() => {
        setLoadingMessageIndex((prevIndex) =>
          prevIndex < loadingMessages.length - 1 ? prevIndex + 1 : prevIndex
        );
      }, 2000);

      return () => clearInterval(interval);
    } else {
      setLoadingMessageIndex(0);
    }
  }, [isUploading]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    await processImage(file);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processImage(file);
    }
  };

  const processImage = async (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setIsUploading(true);
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);

      // Simulate API call for song recommendations
      await new Promise((resolve) => setTimeout(resolve, 8000));

      const generatedTrack: Song = {
        id: "ai-track",
        title: "AI-Generated Song",
        artist: "MelosAI",
        image: imageUrl,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      };
      setAiGeneratedTrack(generatedTrack);

      setSongs([
        {
          id: "1",
          title: "Midnight Dreams",
          artist: "Luna Echo",
          image:
            "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800",
          audioUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        },
        {
          id: "2",
          title: "Sunset Vibes",
          artist: "Ocean Waves",
          image:
            "https://images.unsplash.com/photo-1682687221006-b7fd60cf9dd0?w=800",
          audioUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        },
        {
          id: "3",
          title: "Urban Lights",
          artist: "City Pulse",
          image:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
          audioUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        },
      ]);

      setIsUploading(false);
    }
  };

  const handlePlayPause = (songId: string, audioUrl: string) => {
    if (currentlyPlaying === songId) {
      audioRef.current?.pause();
      setCurrentlyPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setCurrentlyPlaying(songId);
    }
  };

  const handleTryAnother = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setUploadedImage(null);
    setSongs([]);
    setAiGeneratedTrack(null);
    setIsUploading(false);
    setCurrentlyPlaying(null);
    setLoadingMessageIndex(0);
    setIsDragging(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {!uploadedImage ? (
        <div
          className={`border-2 border-dashed border-white rounded-lg p-12 text-center transition-colors ${
            isDragging
              ? "border-pink-500 bg-pink-500/10"
              : "border-gray-700 hover:border-pink-500/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="file-upload"
            onChange={handleFileSelect}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="w-12 h-12 text-pink-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Drop your image here
            </h3>
            <p className="text-gray-400">or click to select a file</p>
          </label>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="relative rounded-lg overflow-hidden bg-gray-800/50 h-[500px]">
            <img
              src={uploadedImage}
              alt="Uploaded image"
              className="w-full h-full object-contain"
            />
          </div>
          {songs.length > 0 && (
            <>
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-white text-center mb-8">
                  Your Personalized Song Recommendations
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {songs.map((song) => (
                    <SongCard
                      key={song.id}
                      song={song}
                      isPlaying={currentlyPlaying === song.id}
                      onPlayPause={() =>
                        handlePlayPause(song.id, song.audioUrl)
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center mb-8">
                <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center space-x-3">
                  <Sparkles className="w-8 h-8 text-indigo-600" />
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                    Our AI Generated Sound
                  </h1>
                </div>
              </div>
              {aiGeneratedTrack && (
                <div className="mt-8">
                  <AudioPlayer track={aiGeneratedTrack} />
                  <div className="mt-4">
                    <WaveForm
                      audioUrl={aiGeneratedTrack.audioUrl}
                      isPlaying={currentlyPlaying === aiGeneratedTrack.id}
                      currentTime={0}
                      duration={0}
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-center">
                <Button
                  onClick={handleTryAnother}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
                >
                  Try Another Image
                </Button>
              </div>
            </>
          )}
        </div>
      )}
      {isUploading && (
        <div className="mt-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <AnimatePresence mode="wait">
            <motion.div
              key={loadingMessageIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <motion.p
                className="text-white text-lg font-semibold"
                animate={{
                  y: [0, -10, 0],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              >
                {loadingMessages[loadingMessageIndex]}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          <motion.div
            className="mt-4 flex justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {loadingMessages.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === loadingMessageIndex ? "bg-pink-500" : "bg-gray-500"
                }`}
                animate={{
                  scale: index === loadingMessageIndex ? [1, 1.5, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  repeat: index === loadingMessageIndex ? Infinity : 0,
                  repeatType: "reverse",
                }}
              />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}

function SongCard({
  song,
  isPlaying,
  onPlayPause,
}: {
  song: Song;
  isPlaying: boolean;
  onPlayPause: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 overflow-hidden">
        <AspectRatio ratio={1 / 1}>
          <img
            src={song.image}
            alt={song.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full w-12 h-12 bg-white/20 hover:bg-white/30 text-white"
              onClick={onPlayPause}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </Button>
          </div>
        </AspectRatio>
        <CardContent className="p-4">
          <h3 className="font-semibold text-white text-lg mb-1 truncate">
            {song.title}
          </h3>
          <p className="text-gray-400 text-sm truncate">{song.artist}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}