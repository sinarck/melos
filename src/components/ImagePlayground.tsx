"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UploadDropzone } from "@/utils/uploadthing";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, PlusCircle, Share2, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

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
    const url = "http://google.com";
    const text = `Check out this song ${song.title} by ${song.artist} that MelosAI recommended from this picture!`;
    window.open(
      `http://twitter.com/share?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );
    setShowShareDialog(false);
  };

  const handleFacebookShare = () => {
    const url = "http://google.com";
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );
    setShowShareDialog(false);
  };

  const handleLinkedinShare = () => {
    const url = "http://google.com";
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
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
        <DialogContent className="sm:max-w-md bg-gray-900 text-white border-transparent drop-shadow-lg">
          <DialogHeader>
            <DialogTitle>Share this song</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center gap-4 py-4">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700"
              onClick={handleLinkedinShare}
            >
              <img src="/linkedin.svg" alt="Linkedin" className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700"
              onClick={handleFacebookShare}
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
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  className="w-full bg-gray-800 text-white hover:bg-gray-700"
                  variant="secondary"
                >
                  <img
                    src="/spotify.svg"
                    alt="Spotify"
                    className="w-5 h-5 mr-2"
                  />
                  Spotify
                </Button>
              </a>
              <a
                href="https://music.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  className="w-full bg-gray-800 text-white hover:bg-gray-700"
                  variant="secondary"
                >
                  <img
                    src="/apple-music.svg"
                    alt="Apple Music"
                    className="w-5 h-5 mr-2"
                  />
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

