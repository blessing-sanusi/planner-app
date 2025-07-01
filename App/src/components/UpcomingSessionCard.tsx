import React, { useState } from 'react';
import { FaUserClock } from 'react-icons/fa';

const allSessions = [
  { date: 'Monday', time: '9:00 AM', client: 'Client A', tech: 'Jane (RBT)', type: 'Direct' },
  { date: 'Tuesday', time: '1:00 PM', client: 'Client B', tech: 'Alex (RBT)', type: 'Parent Training' },
  { date: 'Wednesday', time: '10:30 AM', client: 'Client C', tech: 'Mia (RBT)', type: 'Indirect' },
  { date: 'Thursday', time: '2:00 PM', client: 'Client D', tech: 'Ryan (RBT)', type: 'Behavior Plan Review' },
];

const typeColors: Record<string, string> = {
  Direct: 'bg-blue-100 text-blue-600',
  Indirect: 'bg-purple-100 text-purple-600',
  'Parent Training': 'bg-green-100 text-green-600',
  'Behavior Plan Review': 'bg-orange-100 text-orange-600',
};

const sessionTypes = ['All', ...new Set(allSessions.map(s => s.type))];

export default function UpcomingSessionsCard() {
  const [filter, setFilter] = useState('All');
  const sessions = filter === 'All' ? allSessions : allSessions.filter(s => s.type === filter);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4 border border-gray-200 h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-green-600">
          <FaUserClock className="text-lg" />
          <h2 className="text-lg font-semibold text-gray-800">Upcoming Client Sessions</h2>
        </div>
        <div className="space-x-2">
          {sessionTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`text-xs px-3 py-1 rounded-full border ${
                filter === type ? 'bg-blue-100 text-blue-600 border-blue-400' : 'text-gray-600 border-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto pr-2">
        <ul className="space-y-4 text-sm">
          {sessions.map((s, idx) => (
            <li key={idx} className="flex justify-between border-b pb-3">
              <div>
                <p className="text-gray-900 font-medium">{s.client}</p>
                <p className="text-xs text-gray-500">{s.tech}</p>
                <span className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[s.type] || 'bg-gray-100 text-gray-600'}`}>
                  {s.type}
                </span>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p className="font-semibold">{s.date}</p>
                <p className="text-xs">{s.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
