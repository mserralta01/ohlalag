import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Palette, Sparkles, Home } from 'lucide-react';

const steps = [
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Select Your Atelier",
    description: "Browse our curated selection of creative workshops, each designed for a perfect evening of artistic exploration"
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Unleash Creativity",
    description: "Step into our welcoming studio where every artistic journey begins with a warm smile and gentle guidance"
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Embrace the Moment",
    description: "Immerse yourself in a relaxing atmosphere where creativity flows naturally and new friendships bloom"
  },
  {
    icon: <Home className="w-8 h-8" />,
    title: "Treasure Your Creation",
    description: "Take home your unique masterpiece, a beautiful reminder of your artistic adventure"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Process() {
  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-serif mb-4">Your Creative Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Four simple steps to your artistic adventure
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={item}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-[2rem] shadow-lg h-full flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mb-4"
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-xl font-serif mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="hidden lg:block absolute top-1/2 left-full w-8 h-0.5 bg-gray-300 transform -translate-y-1/2"
                    style={{ width: 'calc(100% - 2rem)' }}
                  />
                )}
              </motion.div>
              
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-2xl font-light text-gray-400">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}