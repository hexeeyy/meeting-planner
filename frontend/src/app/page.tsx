"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

interface Meeting {
  id: number;
  title: string;
  start: string; // ISO string (e.g., "2025-06-16T14:00:00")
  end: string;   // ISO string
  booker: string;
  status: 'confirmed' | 'pending';
  description: string;
}

export default function Home() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [booker, setBooker] = useState('');
  const [status, setStatus] = useState<'confirmed' | 'pending'>('pending');
  const [description, setDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchMeetings();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const start = `${date}T${startTime}:00`;
    const end = `${date}T${endTime}:00`;
    try {
      const response = await fetch('http://localhost:3000/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          start_time: start,
          end_time: end,
          booker,
          status,
          description,
        }),
      });
      if (!response.ok) throw new Error('Failed to create meeting');
      setTitle('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setBooker('');
      setStatus('pending');
      setDescription('');
      setIsDialogOpen(false);
      fetchMeetings();
      setError(null);
    } catch (error) {
      console.error('Error creating meeting:', error);
      setError('Failed to schedule meeting.');
    }
  };

  const handleSelectEvent = (event: Meeting) => {
    alert(`Meeting: ${event.title}\nBooker: ${event.booker}\nStatus: ${event.status}\nTime: ${format(new Date(event.start), 'PPP p')} - ${format(new Date(event.end), 'p')}\nDescription: ${event.description || 'None'}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Meeting Room Scheduler</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Room Calendar</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Book Meeting</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule a Meeting</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Meeting Title"
                required
              />
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <div className="flex space-x-4">
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="Start Time"
                  required
                />
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="End Time"
                  required
                />
              </div>
              <Input
                type="text"
                value={booker}
                onChange={(e) => setBooker(e.target.value)}
                placeholder="Your Name"
                required
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'confirmed' | 'pending')}
                className="border rounded p-2"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
              </select>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
              <Button type="submit">Schedule</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        <BigCalendar
          localizer={localizer}
          events={meetings.map((m) => ({
            ...m,
            start: new Date(m.start),
            end: new Date(m.end),
            title: `${m.title} (${m.booker} - ${m.status})`,
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
          className="p-4"
        />
      </div>
    </div>
  );
}