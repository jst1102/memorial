import React, { useState, useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import Cropper from 'react-easy-crop';
import toast from 'react-hot-toast';

const PhotoUpload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [caption, setCaption] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    // Store cropped area pixels for final upload
  }, []);

  const handleUpload = async () => {
    try {
      // Add Firebase upload logic here
      toast.success('Photo uploaded successfully');
      setImage(null);
      setCaption('');
    } catch (error) {
      toast.error('Failed to upload photo');
    }
  };

  return (
    <div className="space-y-4">
      {!image ? (
        <label className="block w-full aspect-video rounded-lg border-2 border-dashed border-white/20 hover:border-white/40 transition cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onFileChange}
          />
          <div className="h-full flex flex-col items-center justify-center space-y-2">
            <Upload className="w-8 h-8" />
            <p className="text-sm text-gray-400">Click to upload a photo</p>
          </div>
        </label>
      ) : (
        <div className="space-y-4">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <button
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 p-1 rounded-full bg-black/50 hover:bg-black/70 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <input
            type="text"
            placeholder="Add a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/5"
          />

          <button
            onClick={handleUpload}
            className="w-full px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            Upload Photo
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;