import React, { useState, useEffect } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Photo {
  id: string;
  url: string;
  caption: string;
}

interface Props {
  viewMode: 'slideshow' | 'grid';
}

const PhotoGallery: React.FC<Props> = ({ viewMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulated photos (replace with Firebase data)
  const photos: Photo[] = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954',
      caption: 'Summer vacation, 1985'
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1517677129300-07b130802f46',
      caption: 'Family gathering, Christmas 1990'
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1516475429286-465d815a0df7',
      caption: 'Their favorite garden spot'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (viewMode === 'slideshow') {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [viewMode, photos.length]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return <Skeleton height={400} className="mb-4" />;
  }

  if (viewMode === 'slideshow') {
    return (
      <div className="relative max-w-4xl mx-auto">
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
          <img
            src={photos[currentIndex].url}
            alt={photos[currentIndex].caption}
            className="object-cover w-full h-full transition-opacity duration-500"
          />
        </div>
        <p className="text-center mt-4 text-gray-300">{photos[currentIndex].caption}</p>
        
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % photos.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <PhotoProvider>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <PhotoView key={photo.id} src={photo.url}>
            <div className="cursor-pointer group relative">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <p className="text-white text-center p-4">{photo.caption}</p>
              </div>
            </div>
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
};

export default PhotoGallery;