import { useState, useEffect } from 'react';

interface Meeting {
  id: number;
  title: string;
  start: string;
  end: string;
  booker: string;
  status: 'confirmed' | 'pending';
  description: string;
}

export default function useMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchMeetings = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/meetings');
      if (!response.ok) throw new Error('Failed to fetch meetings');
      const data = await response.json();
      setMeetings(
        data.map((m: any) => ({
          ...m,
          start: m.start_time,
          end: m.end_time,
        }))
      );
      setError(null);
    } catch (error) {
      console.error('Error fetching meetings:', error);
      setError('Failed to load meetings.');
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return { meetings, error, fetchMeetings };
}