import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Trash2, Image, Plus } from 'lucide-react';

interface GalleryItem {
  id: string;
  imageUrl: string;
  artistName: string;
  date: string;
}

function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    artistName: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch('/api/gallery');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return;

    setUploading(true);
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('artistName', newItem.artistName);
      formData.append('date', newItem.date);

      const response = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Reset form and refresh gallery items
        setNewItem({
          artistName: '',
          date: new Date().toISOString().split('T')[0]
        });
        setSelectedImage(null);
        setImagePreview(null);
        fetchGalleryItems();
      }
    } catch (error) {
      console.error('Error adding gallery item:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchGalleryItems();
      }
    } catch (error) {
      console.error('Error deleting gallery item:', error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-serif mb-6">Gallery Management</h2>

        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <div className="flex items-center justify-center w-full">
              {imagePreview ? (
                <div className="relative w-full aspect-video">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide border border-gray-300 cursor-pointer hover:bg-gray-50">
                  <Plus className="w-8 h-8 text-gray-500" />
                  <span className="mt-2 text-base">Select an image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageSelect}
                    disabled={uploading}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Artist Name
              </label>
              <input
                type="text"
                value={newItem.artistName}
                onChange={(e) => setNewItem({ ...newItem, artistName: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={newItem.date}
                onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={uploading || !selectedImage}
              className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Add to Gallery'}
            </button>
          </div>
        </form>
      </div>

      {/* Gallery Items Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={`Artwork by ${item.artistName}`}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <p className="font-medium">{item.artistName}</p>
              <p className="text-sm text-gray-600">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default GalleryManager;