import { useState, useEffect } from 'react';
import { Event } from '../types';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API integration will be implemented here
    // For now, we're using mock data in the Events component
  }, []);

  return { events, loading, error };
}