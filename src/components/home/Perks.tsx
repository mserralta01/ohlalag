import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Users, Heart, Coffee } from 'lucide-react';

const perks = [
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Creative Expression",
    description: "From seasonal decorations to personalized art pieces, discover your unique style"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Intimate Gatherings",
    description: "Small groups ensure personal attention and meaningful connections"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Welcoming Space",
    description: "A judgment-free zone where every artistic attempt is celebrated"
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    title: "Cozy Atmosphere",
    description: "Enjoy artisanal cheese boards in our warm, inviting studio"
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

export default function Perks() {
  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-serif mb-4">The Oh-La-La Experience</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Step into a world where creativity knows no bounds and every session 
            brings a new adventure in artistic expression
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {perks.map((perk, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="text-center"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md"
              >
                {perk.icon}
              </motion.div>
              <h3 className="font-semibold mb-2">{perk.title}</h3>
              <p className="text-gray-600">{perk.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}