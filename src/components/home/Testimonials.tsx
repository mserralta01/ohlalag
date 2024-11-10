import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Regular Oh-La-La Artist",
    content: "These creative sessions are my monthly escape! Andrea's warm guidance and the friendly atmosphere make every visit special. I've made wonderful friends here!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    name: "Emily Rodriguez",
    role: "Monthly Member",
    content: "This is my favorite form of self-care! The projects are always unique and exciting. I love how we can bring our favorite refreshments to enjoy while creating.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    name: "Lisa Thompson",
    role: "Wellington Resident",
    content: "Such a refreshing way to spend an evening! The projects are approachable yet impressive, and the atmosphere is always warm and welcoming.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Testimonials() {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-serif mb-4">Happy Artists</h2>
          <p className="text-gray-600">Join our growing community of creative souls</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-6 rounded-[2rem] shadow-lg"
            >
              <motion.div 
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center mb-4"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}