import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface Meeting {
  id: number;
  title: string;
  start: string;
  end: string;
  booker: string;
  status: 'confirmed' | 'pending';
  description: string;
}

interface CalendarViewProps {
  meetings: Meeting[];
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

export default function CalendarView({ meetings }: CalendarViewProps) {
  const handleSelectEvent = (event: Meeting) => {
    alert(
      `Meeting: ${event.title}\nBooker: ${event.booker}\nStatus: ${event.status}\nTime: ${format(
        new Date(event.start),
        'PPP p'
      )} - ${format(new Date(event.end), 'p')}\nDescription: ${event.description || 'None'}`
    );
  };

  return (
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
  );
}