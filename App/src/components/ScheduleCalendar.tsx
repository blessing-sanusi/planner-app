import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'Supervision: Client A (Direct)',
    start: new Date(),
    end: new Date(new Date().getTime() + 60 * 60 * 1000),
    type: 'Direct',
  },
  {
    title: 'Parent Training: Client B',
    start: new Date(new Date().setHours(new Date().getHours() + 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 4)),
    type: 'Parent Training',
  },
  {
    title: 'Behavior Plan Review: Client C',
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 1) + 60 * 60 * 1000),
    type: 'Behavior Plan Review',
  },
];

// Map session types to background colors for the calendar event style
const eventTypeColors: Record<string, string> = {
  Direct: '#3b82f6', // blue-500
  'Parent Training': '#22c55e', // green-500
  'Behavior Plan Review': '#f97316', // orange-500
  Indirect: '#8b5cf6', // purple-500 (add if needed)
  Observation: '#6b7280', // gray-500 (add if needed)
};

export default function ScheduleCalendar() {
  // This function customizes event style
  const eventStyleGetter = (event: any) => {
    const backgroundColor = eventTypeColors[event.type] || '#3b82f6';
    const style = {
      backgroundColor,
      borderRadius: '4px',
      opacity: 0.9,
      color: 'white',
      border: '0px',
      display: 'block',
      paddingLeft: '6px',
      paddingRight: '6px',
      fontWeight: '600',
    };
    return { style };
  };

  return (
    <div style={{ height: 500 }} className="rounded-md overflow-hidden">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}
