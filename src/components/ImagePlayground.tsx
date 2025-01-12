"use client";

import { useState, useRef } from "react";
import { Upload, Play, Pause, Share2, PlusCircle } from "lucide-react";
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

interface Song {
  id: string;
  title: string;
  artist: string;
  image: string;
  audioUrl: string;
}

export default function ImagePlayground() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      await new Promise((resolve) => setTimeout(resolve, 1500));
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
    setUploadedImage(null);
    setSongs([]);
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
          <div className="relative rounded-lg overflow-hidden bg-gray-800/50 h-[400px]">
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Analyzing your image...</p>
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
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleTwitterShare = () => {
    const url = "http://google.com";  // Replace with your actual URL
    const text = "Check out this song: " + song.title + " by " + song.artist + "that MelosAI recommended from this picture!";  // Customize the share text
    window.open(
      `http://twitter.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      '',
      'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0'
    );
    setShowShareDialog(false);
  };

  return (
    <>
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
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-700/50 rounded-full text-gray-400 hover:text-white"
              onClick={() => setShowShareDialog(true)}
            >
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-700/50 rounded-full text-gray-400 hover:text-white"
            >
              <PlusCircle className="w-5 h-5" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>Share this song</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center gap-4 py-4">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              <img src="/instagram.svg" alt="Instagram" className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              <img src="/facebook.svg" alt="Facebook" className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700"
              onClick={handleTwitterShare}
            >
              <img src="/twitter.svg" alt="Twitter" className="w-5 h-5" />
            </Button>
          </div>
          <div className="border-t border-gray-800 mt-4 pt-4">
            <p className="text-center text-sm text-gray-400 mb-4">
              Add to your library
            </p>
            <div className="flex justify-center gap-4">
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button
                  className="w-full bg-gray-800 text-white hover:bg-gray-700"
                  variant="secondary"
                >
                  <img src="/spotify.svg" alt="Spotify" className="w-5 h-5 mr-2" />
                  Spotify
                </Button>
              </a>
              <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button
                  className="w-full bg-gray-800 text-white hover:bg-gray-700"
                  variant="secondary"
                >
                  <img src="/apple-music.svg" alt="Apple Music" className="w-5 h-5 mr-2" />
                  Apple Music
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
