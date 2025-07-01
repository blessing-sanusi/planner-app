import React, { useState } from 'react';
import { FaUserClock, FaPlus } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';

const allSessionsInit = [
  { date: 'Mon, Jul 1', time: '9:00 AM', client: 'Client A', tech: 'Jane (RBT)', type: 'Direct' },
  { date: 'Tue, Jul 2', time: '1:00 PM', client: 'Client B', tech: 'Alex (RBT)', type: 'Parent Training' },
];

const typeColors: Record<string, string> = {
  Direct: 'bg-blue-100 text-blue-700',
  Indirect: 'bg-purple-100 text-purple-700',
  'Parent Training': 'bg-green-100 text-green-700',
  'Behavior Plan Review': 'bg-orange-100 text-orange-700',
};

const sessionTypes = ['All', 'Direct', 'Parent Training', 'Indirect', 'Behavior Plan Review'];

export default function UpcomingSessionsCard() {
  const [filter, setFilter] = useState('All');
  const [sessions, setSessions] = useState(allSessionsInit);
  const [isOpen, setIsOpen] = useState(false);

  const filteredSessions =
    filter === 'All' ? sessions : sessions.filter((s) => s.type === filter);

  const [newSession, setNewSession] = useState({
    client: '',
    tech: '',
    date: '',
    time: '',
    type: 'Direct',
  });

  const addSession = () => {
    setSessions((prev) => [...prev, newSession]);
    setNewSession({ client: '', tech: '', date: '', time: '', type: 'Direct' });
    setIsOpen(false);
  };

  const renderAvatar = (name: string) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return (
      <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-xs font-semibold text-blue-800">
        {initials}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-5 h-full transition-all">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2 text-blue-600">
          <FaUserClock className="text-lg" />
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Sessions</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {sessionTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`text-xs px-3 py-1 rounded-full border font-medium transition ${
                filter === type
                  ? 'bg-blue-100 text-blue-700 border-blue-400'
                  : 'text-gray-600 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {type}
            </button>
          ))}
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 text-xs px-3 py-1 border border-blue-400 text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100 transition"
          >
            <FaPlus className="text-xs" />
            Add
          </button>
        </div>
      </div>

      {/* Sessions List */}
      <ul className="space-y-4 max-h-64 overflow-y-auto pr-1">
        {filteredSessions.map((s, idx) => (
          <li
            key={idx}
            className="flex justify-between items-start border-b pb-3 hover:bg-gray-50 px-2 rounded-md transition"
          >
            <div className="flex gap-2 items-start">
              {renderAvatar(s.client)}
              <div>
                <p className="text-base font-semibold text-gray-800">{s.client}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.tech}</p>
                <span
                  className={`inline-block text-xs mt-1 px-2 py-0.5 rounded-full font-medium ${typeColors[s.type] || 'bg-gray-100 text-gray-700'}`}
                >
                  {s.type}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">{s.date}</p>
              <p className="text-xs text-gray-500">{s.time}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
            <Dialog.Title className="text-lg font-semibold text-gray-800">Add New Session</Dialog.Title>
            <div className="grid grid-cols-1 gap-3 text-sm">
              {['client', 'tech', 'date', 'time'].map((field) => (
                <input
                  key={field}
                  type="text"
                  value={newSession[field as keyof typeof newSession]}
                  onChange={(e) => setNewSession({ ...newSession, [field]: e.target.value })}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="border border-gray-300 px-3 py-2 rounded-md"
                />
              ))}
              <select
                value={newSession.type}
                onChange={(e) => setNewSession({ ...newSession, type: e.target.value })}
                className="border border-gray-300 px-3 py-2 rounded-md"
              >
                {sessionTypes.slice(1).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setIsOpen(false)} className="text-sm px-4 py-1 rounded-md border">Cancel</button>
              <button onClick={addSession} className="text-sm px-4 py-1 rounded-md bg-blue-600 text-white">Add</button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
