import React, { useState } from 'react';
import { FaUserClock } from 'react-icons/fa';

const allSessions = [
  { date: 'Monday', time: '9:00 AM', client: 'Client A', tech: 'Jane (RBT)', type: 'Direct' },
  { date: 'Tuesday', time: '1:00 PM', client: 'Client B', tech: 'Alex (RBT)', type: 'Parent Training' },
  { date: 'Wednesday', time: '10:30 AM', client: 'Client C', tech: 'Mia (RBT)', type: 'Indirect' },
  { date: 'Thursday', time: '2:00 PM', client: 'Client D', tech: 'Ryan (RBT)', type: 'Behavior Plan Review' },
];

const typeColors: Record<string, string> = {
  Direct: 'bg-blue-100 text-blue-700',
  Indirect: 'bg-purple-100 text-purple-700',
  'Parent Training': 'bg-green-100 text-green-700',
  'Behavior Plan Review': 'bg-orange-100 text-orange-700',
};

const typeIcons: Record<string, string> = {
  Direct: '🧠',
  Indirect: '📝',
  'Parent Training': '👨‍👩‍👧',
  'Behavior Plan Review': '📋',
};

const sessionTypes = ['All', ...new Set(allSessions.map(s => s.type))];

export default function UpcomingSessionsCard() {
  const [filter, setFilter] = useState('All');
  const sessions = filter === 'All' ? allSessions : allSessions.filter(s => s.type === filter);

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 space-y-6 bg-gradient-to-tr from-indigo-50 via-white to-indigo-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-indigo-700">
          <FaUserClock className="text-xl" />
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Sessions</h2>
        </div>
        <div className="space-x-2">
          {sessionTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`text-xs px-3 py-1 rounded-full border font-medium transition ${
                filter === type
                  ? 'bg-indigo-100 text-indigo-700 border-indigo-400 shadow-sm'
                  : 'text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Session List */}
      <ul className="space-y-4 max-h-80 overflow-y-auto pr-1 text-sm">
        {sessions.map((s, idx) => (
          <li
            key={idx}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-100 p-4 rounded-xl hover:bg-indigo-50 transition cursor-pointer"
          >
            <div>
              <p className="text-lg font-semibold text-gray-800">{s.client}</p>
              <p className="text-sm text-gray-500">{s.tech}</p>
              <span className={`mt-2 inline-block text-xs px-3 py-1 rounded-full font-medium ${typeColors[s.type]}`}>
                {typeIcons[s.type]} {s.type}
              </span>
            </div>
            <div className="text-right text-sm text-gray-600 self-start sm:self-center">
              <p className="font-medium">{s.date}</p>
              <p className="text-xs">{s.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
