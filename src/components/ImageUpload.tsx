"use client"

import { useState, useRef } from "react"
import { Upload, Play, Pause } from 'lucide-react'
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Song {
  id: string
  title: string
  artist: string
  image: string
  audioUrl: string
}

export default function ImageUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [songs, setSongs] = useState<Song[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const router = useRouter()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    await processImage(file)
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await processImage(file)
    }
  }

  const processImage = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setIsUploading(true)
      const imageUrl = URL.createObjectURL(file)
      setUploadedImage(imageUrl)

      // Simulate API call for song recommendations
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSongs([
        {
          id: '1',
          title: 'Midnight Dreams',
          artist: 'Luna Echo',
          image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        },
        {
          id: '2',
          title: 'Sunset Vibes',
          artist: 'Ocean Waves',
          image: 'https://images.unsplash.com/photo-1682687221006-b7fd60cf9dd0?w=800',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
        },
        {
          id: '3',
          title: 'Urban Lights',
          artist: 'City Pulse',
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
        }
      ])
      setIsUploading(false)
    }
  }

  const handlePlayPause = (songId: string, audioUrl: string) => {
    if (currentlyPlaying === songId) {
      audioRef.current?.pause()
      setCurrentlyPlaying(null)
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      audioRef.current = new Audio(audioUrl)
      audioRef.current.play()
      setCurrentlyPlaying(songId)
    }
  }

  const handleTryAnother = () => {
    router.push('/login')
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {!uploadedImage ? (
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            isDragging
              ? 'border-pink-500 bg-pink-500/10'
              : 'border-white/20 hover:border-pink-500/50'
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
            <p className="text-white/60">or click to select a file</p>
          </label>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={uploadedImage}
              alt="Uploaded image"
              className="w-full h-full object-cover"
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
                      onPlayPause={() => handlePlayPause(song.id, song.audioUrl)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={handleTryAnother}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
                >
                  Try Another
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {isUploading && (
        <div className="mt-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
          <p className="text-white/60 mt-4">Analyzing your image...</p>
        </div>
      )}
    </div>
  )
}

function SongCard({ song, isPlaying, onPlayPause }: { 
  song: Song
  isPlaying: boolean
  onPlayPause: () => void
}) {
  const [showShareDialog, setShowShareDialog] = useState(false)

  return (
    <>
      <div className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden">
        <div className="relative aspect-square">
          <img
            src={song.image}
            alt={song.title}
            className="w-full h-full object-cover"
          />
          <button 
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
            onClick={onPlayPause}
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              {isPlaying ? (
                <Pause className="w-6 h-6 text-black" />
              ) : (
                <Play className="w-6 h-6 text-black ml-1" />
              )}
            </div>
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-white mb-1">{song.title}</h3>
          <p className="text-white/60 text-sm">{song.artist}</p>
          <div className="flex justify-between mt-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/10"
              onClick={() => setShowShareDialog(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this song</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center gap-4 py-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <img
                src="/instagram.svg"
                alt="Instagram"
                className="w-5 h-5"
              />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <img
                src="/facebook.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <img
                src="/twitter.svg"
                alt="Twitter"
                className="w-5 h-5"
              />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <img
                src="/copy.svg"
                alt="Copy Link"
                className="w-5 h-5"
              />
            </Button>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 mt-4 pt-4">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              Add to your library
            </p>
            <div className="flex justify-center gap-4">
              <Button className="w-full" variant="outline">
                <img
                  src="/spotify.svg"
                  alt="Spotify"
                  className="w-5 h-5 mr-2"
                />
                Spotify
              </Button>
              <Button className="w-full" variant="outline">
                <img
                  src="/apple-music.svg"
                  alt="Apple Music"
                  className="w-5 h-5 mr-2"
                />
                Apple Music
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

