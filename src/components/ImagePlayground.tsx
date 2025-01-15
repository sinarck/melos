"use client";

import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/utils/uploadthing";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import SongCard, { Song } from "./song-card";

const loadingMessages = [
  "Retrieving your image — just a moment!",
  '"A cozy house with a bonfire and s\'mores"',
  "Finding songs matching image vibe description",
  "Displaying your songs",
];

export default function ImagePlayground() {
  const [uploaded, setUploaded] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

    setUploaded(false);
    setSongs([]);
    setIsUploading(false);
    setCurrentlyPlaying(null);
    setLoadingMessageIndex(0);
  };

  if (!uploaded) {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <UploadDropzone
          appearance={{
            button: "text-white",
            label: "text-white",
            allowedContent: "text-neutral-300",
            container:
              "border-2 border-dashed border-white rounded-lg p-12 text-center transition-colors",
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            toast.success("Image uploaded successfully", {
              description: "Now we'll generate some music for you.",
            });

            setUploaded(true);
          }}
          onUploadError={(error: Error) => {
            toast.error("Something went wrong", {
              description: `${error.message}`,
            });
          }}
        />
      </div>
    );
  }

  const processImage = async (imageUrl: string) => {
    setIsUploading(true);
    setLoadingMessageIndex(0);

    {
      () => {
        new Promise((resolve) => setTimeout(resolve, 1000));
      };
      setLoadingMessageIndex(1);

      () => {
        new Promise((resolve) => setTimeout(resolve, 1000));
      };
      setLoadingMessageIndex(2);
      setSongs([
        {
          id: "1",
          title: "Song Title",
          audioUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          artist: "Artist",
          image: "https://via.placeholder.com/150",
        },
      ]);

      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="space-y-8">
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
                    onPlayPause={() => handlePlayPause(song.id, song.audioUrl)}
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

