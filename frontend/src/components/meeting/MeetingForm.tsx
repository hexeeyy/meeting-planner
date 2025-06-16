import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';

interface MeetingFormProps {
  onSubmit: () => void;
}

interface Meeting {
  id: number;
  title: string;
  start: string;
  end: string;
  booker: string;
  status: 'confirmed' | 'pending';
  description: string;
}

export default function MeetingForm({ onSubmit }: MeetingFormProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [booker, setBooker] = useState('');
  const [status, setStatus] = useState<'confirmed' | 'pending'>('pending');
  const [description, setDescription] = useState('');

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
      onSubmit();
    } catch (error) {
      console.error('Error creating meeting:', error);
      alert('Failed to schedule meeting.');
    }
  };

  return (
    <>
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
            className="border rounded p-2 w-full"
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
    </>
  );
}