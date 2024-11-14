import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.GalleryItem || mongoose.model('GalleryItem', galleryItemSchema);