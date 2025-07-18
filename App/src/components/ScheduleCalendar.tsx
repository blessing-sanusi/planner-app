import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

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

const eventTypeColors: Record<string, string> = {
  Direct: '#3b82f6',
  'Parent Training': '#22c55e',
  'Behavior Plan Review': '#f97316',
  Indirect: '#8b5cf6',
  Observation: '#6b7280',
};

function eventStyleGetter(event: any) {
  const backgroundColor = eventTypeColors[event.type] || '#3b82f6';
  return {
    style: {
      backgroundColor,
      borderRadius: '4px',
      opacity: 0.9,
      color: 'white',
      border: '0px',
      display: 'block',
      paddingLeft: '6px',
      paddingRight: '6px',
      fontWeight: '600',
    },
  };
}

function ScheduleModal({
  onClose,
  onSave,
  clients,
}: {
  onClose: () => void;
  onSave: (event: any) => void;
  clients: { id: string; name: string }[];
}) {
  const [client, setClient] = useState('');
  const [type, setType] = useState('Direct');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || !start || !end) {
      alert('Please fill all fields');
      return;
    }

    // Find client name by id:
    const selectedClient = clients.find((c) => c.id === client);
    const clientName = selectedClient ? selectedClient.name : client;

    const newEvent = {
      title: `${type}: ${clientName}`,
      client: clientName,
      type,
      start: new Date(start),
      end: new Date(end),
    };
    onSave(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4"
      >
        <h2 className="text-xl font-bold">Add New Schedule</h2>

        <label className="block">
          Client:
          <select
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            required
          >
            <option value="">Select client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Session Type:
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          >
            {Object.keys(eventTypeColors).map((typeName) => (
              <option key={typeName} value={typeName}>
                {typeName}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Start Time:
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </label>

        <label className="block">
          End Time:
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </label>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ScheduleCalendar() {
  const [events, setEvents] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);

  // Load clients from Firestore once
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'clients'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setClients(data);
    });

    return () => unsubscribe();
  }, []);

  // Load events from Firestore
  useEffect(() => {
    const q = query(collection(db, 'schedules'), orderBy('start'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedEvents = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          client: data.client,
          type: data.type,
          start: data.start.toDate(),
          end: data.end.toDate(),
        };
      });
      setEvents(loadedEvents);
    });

    return () => unsubscribe();
  }, []);

  const addNewSchedule = async (newEvent: any) => {
    try {
      await addDoc(collection(db, 'schedules'), {
        title: newEvent.title,
        client: newEvent.client,
        type: newEvent.type,
        start: Timestamp.fromDate(newEvent.start),
        end: Timestamp.fromDate(newEvent.end),
      });
    } catch (error) {
      console.error('Error adding schedule:', error);
      alert('Failed to add schedule.');
    }
  };

  const upcomingSessions = events.filter((ev) => ev.start >= new Date());

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Schedule Calendar</h1>
      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        + Add Schedule
      </button>

      <div style={{ height: 500 }} className="rounded-md overflow-hidden mb-10">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          eventPropGetter={eventStyleGetter}
        />
      </div>

      <h2 className="text-xl font-semibold mb-3">Upcoming Sessions</h2>
      <ul className="space-y-2">
        {upcomingSessions.length === 0 && <li>No upcoming sessions</li>}
        {upcomingSessions.map((session) => (
          <li
            key={session.id}
            className="border border-gray-300 rounded px-4 py-2 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{session.client}</p>
              <p className="text-sm text-gray-600">{session.type}</p>
              <p className="text-sm text-gray-500">
                {session.start.toLocaleString()} - {session.end.toLocaleTimeString()}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {modalOpen && (
        <ScheduleModal
          onClose={() => setModalOpen(false)}
          onSave={addNewSchedule}
          clients={clients}
        />
      )}
    </div>
  );
}
