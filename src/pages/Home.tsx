import React from 'react';
import Hero from '../components/home/Hero';
import NextEvent from '../components/home/NextEvent';
import Process from '../components/home/Process';
import Perks from '../components/home/Perks';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';
import MeetAndrea from '../components/home/MeetAndrea';

function Home() {
  const nextEvent = {
    id: '1',
    title: 'Autumn Glow & Create',
    date: '2024-03-25',
    time: '19:00',
    description: 'Join us for a delightful evening of pumpkin decorating! Bring your favorite beverage and let your creativity flow. Perfect for all skill levels.',
    price: 89,
    spotsLeft: 4
  };

  return (
    <div className="relative">
      <Hero />
      <NextEvent event={nextEvent} />
      <Process />
      <Perks />
      <Testimonials />
      <CallToAction />
      <MeetAndrea />
    </div>
  );
}

export default Home;