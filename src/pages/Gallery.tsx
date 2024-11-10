import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface GalleryItem {
  id: string;
  imageUrl: string;
  artistName: string;
  date: string;
}

function Gallery() {
  // This will be replaced with API data
  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      artistName: 'Sarah',
      date: '2024-02-15'
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      artistName: 'Emily',
      date: '2024-02-10'
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      artistName: 'Lisa',
      date: '2024-02-05'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif mb-4">Our Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the beautiful creations from our talented artists. Each piece tells a unique story
            and showcases the creativity that flows in our ateliers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative aspect-square">
                <img
                  src={item.imageUrl}
                  alt={`Artwork by ${item.artistName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-lg font-medium">By {item.artistName}</p>
                <p className="text-gray-600">{format(new Date(item.date), 'MMMM d, yyyy')}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;