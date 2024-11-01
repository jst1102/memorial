import React, { useState, useEffect } from 'react';
import { Heart, Music, Grid, PlayCircle, PauseCircle } from 'lucide-react';
import PhotoGallery from './components/PhotoGallery';
import MemoryWall from './components/MemoryWall';
import AddMemory from './components/AddMemory';
import PhotoUpload from './components/PhotoUpload';
import { useAudio } from './hooks/useAudio';

function App() {
  const [viewMode, setViewMode] = useState<'slideshow' | 'grid'>('slideshow');
  const { isPlaying, togglePlay } = useAudio('/peaceful-music.mp3');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="relative h-[50vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&q=80")' }}
        />
        <div className="relative text-center space-y-4 p-8">
          <h1 className="text-5xl md:text-7xl font-serif">In Loving Memory</h1>
          <p className="text-xl md:text-2xl font-light">1950 - 2024</p>
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={togglePlay}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <Music className="w-5 h-5" />
              <span>{isPlaying ? 'Pause Music' : 'Play Music'}</span>
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'slideshow' ? 'grid' : 'slideshow')}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              {viewMode === 'slideshow' ? (
                <><Grid className="w-5 h-5" /><span>View All</span></>
              ) : (
                <><PlayCircle className="w-5 h-5" /><span>Slideshow</span></>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        <PhotoGallery viewMode={viewMode} />
        
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif mb-2">Share Your Memories</h2>
            <p className="text-gray-400">Add your photos and messages to celebrate their life</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <PhotoUpload />
            <AddMemory />
          </div>
        </section>

        <MemoryWall />
      </main>

      {/* Footer */}
      <footer className="bg-black/30 py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="w-5 h-5 text-pink-500" />
            <span>Forever in our hearts</span>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Memorial Site</p>
        </div>
      </footer>
    </div>
  );
}

export default App;