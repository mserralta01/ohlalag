import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import RegistrationForm from '../components/RegistrationForm';
import { format } from 'date-fns';

function EventDetails() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // This will be replaced with API data
  const event = {
    id: '1',
    title: 'Evening Paint & Wine',
    date: '2024-03-25',
    time: '19:00',
    location: 'Wellington Studio',
    price: 89,
    description: 'Join us for an enchanting evening of artistic exploration paired with fine wines and artisanal cheeses. Perfect for beginners and experienced artists alike, this intimate gathering combines creative expression with social connection.',
    images: [
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    ],
    spotsAvailable: 8,
    totalSpots: 12,
    duration: '2 hours',
    includes: [
      'All art supplies',
      'Wine and cheese selection',
      'Professional guidance',
      'Take home your creation'
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === event.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? event.images.length - 1 : prev - 1
    );
  };

  const handleRegistration = async (formData: any) => {
    // This will be implemented with the API integration
    console.log('Registration data:', formData);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <motion.img
              key={currentImageIndex}
              src={event.images[currentImageIndex]}
              alt={event.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-[500px] object-cover"
            />
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {event.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-serif mb-4">{event.title}</h1>
              <p className="text-gray-600">{event.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3" />
                <span>{format(new Date(event.date), 'MMMM d, yyyy')} at {event.time}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-3" />
                <span>{event.spotsAvailable} spots available</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">What's Included</h3>
              <ul className="space-y-2">
                {event.includes.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-1.5 h-1.5 bg-black rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-gray-600">Price per person</p>
                  <p className="text-3xl font-semibold">${event.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="text-lg">{event.duration}</p>
                </div>
              </div>

              <RegistrationForm eventId={id!} onSubmit={handleRegistration} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;