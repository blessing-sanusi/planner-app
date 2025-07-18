import React, { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { format } from 'date-fns';

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

export default function UpcomingSessionsCard() {
  const [allSessions, setAllSessions] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const q = query(collection(db, 'schedules'), orderBy('start'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const now = new Date();
      const sessions = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          const start = data.start.toDate();
          const end = data.end.toDate();

          return {
            id: doc.id,
            client: data.client,
            type: data.type,
            start,
            end,
            tech: data.tech || 'Unassigned', // fallback if not provided
            date: format(start, 'EEEE'), // e.g. "Monday"
            time: format(start, 'p'),    // e.g. "9:00 AM"
          };
        })
        .filter((s) => s.start > now); // Only future sessions

      setAllSessions(sessions);
    });

    return () => unsubscribe();
  }, []);

  const sessionTypes = ['All', ...Array.from(new Set(allSessions.map((s) => s.type)))];
  const sessionsToShow = filter === 'All' ? allSessions : allSessions.filter((s) => s.type === filter);

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upcoming Sessions</h2>
        <div className="flex flex-wrap gap-2">
          {sessionTypes.map((type) => (
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
      <ul className="max-h-[320px] overflow-y-auto pr-2" aria-label="Upcoming client sessions">
        {sessionsToShow.length === 0 ? (
          <li className="text-gray-500 text-sm">No upcoming sessions</li>
        ) : (
          sessionsToShow.map((s) => (
            <li
              key={s.id}
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
          ))
        )}
      </ul>
    </div>
  );
}
