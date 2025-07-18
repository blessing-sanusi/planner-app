import React, { useState } from 'react';

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
    <div className="bg-white rounded-3xl border border-gray-200 p-6 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upcoming Sessions</h2>
        <div className="flex flex-wrap gap-2">
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
      <ul
        className="max-h-[320px] overflow-y-auto pr-2"
        aria-label="Upcoming client sessions"
      >
        {sessions.map((s, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between border-b border-gray-200 py-2 last:border-b-0 cursor-pointer hover:bg-indigo-50 transition"
            tabIndex={0}
            aria-label={`${s.client} session with ${s.tech} on ${s.date} at ${s.time}, type ${s.type}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 min-w-0">
              <p className="text-lg font-semibold text-gray-800 truncate min-w-[140px] max-w-[220px]">{s.client}</p>
              <p className="text-sm text-gray-500 truncate max-w-[150px]">{s.tech}</p>
              <span
                className={`mt-1 sm:mt-0 inline-block text-xs px-2 py-1 rounded-full font-medium select-none ${typeColors[s.type]}`}
              >
                {typeIcons[s.type]} {s.type}
              </span>
            </div>
            <div className="text-sm text-gray-600 whitespace-nowrap text-right flex-shrink-0 min-w-[90px]">
              <p className="font-medium">{s.date}</p>
              <p className="text-xs">{s.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
