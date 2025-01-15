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
import { motion } from "framer-motion";
import { Pause, Play, PlusCircle, Share2 } from "lucide-react";
import { useState } from "react";

export interface Song {
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

const SongCard = ({
  song,
  isPlaying,
  onPlayPause,
}: {
  song: Song;
  isPlaying: boolean;
  onPlayPause: () => void;
}) => {
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
};

export default SongCard;

