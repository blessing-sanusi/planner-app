import React, { useState, useEffect, useCallback  } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import axios from "axios";
import { FaPlus } from 'react-icons/fa';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import AddSupervisionSessionModal from './Modals/AddSupervisionSessionModal';

interface SupervisionSession {
  id: string;
  userId: string;
  date: string;
  hours: number;
  type: string;
  notes?: string;
  makeupNeeded?: boolean;
}

export default function SupervisionSummaryCard() {
  const userId = process.env.REACT_APP_USER_ID!;

  const [sessions, setSessions] = useState<SupervisionSession[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const totalGoal = 20; // Weekly or monthly goal (adjust as needed)

// useEffect(() => {
//     const q = query(
//       collection(db, 'sessions'),
//       where('userId', '==', userId),
//       orderBy('date', 'desc')
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map(doc => {
//         const d = doc.data();
//         return {
//           id: doc.id,
//           userId: d.userId,
//           date: d.date instanceof Timestamp ? d.date.toDate().toISOString() : d.date,
//           hours: d.hours,
//           type: d.type,
//           notes: d.notes,
//           makeupNeeded: d.makeupNeeded
//         } as SupervisionSession;
//       });
//       setSessions(data);
//     });

//     return unsubscribe;
//   }, [userId]);

 const fetchSessions = useCallback(async () => {
    try {
      const res = await axios.get(`/supervision_sessions/${userId}`);
      setSessions(res.data);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    }
  }, [userId]);

  // 2. Call fetch on component mount
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);  
  const totalHours = sessions.reduce((sum, s) => sum + s.hours, 0);
  const percent = (totalHours / totalGoal) * 100;
  const weeklyData = computeWeeklyData(sessions);

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 bg-gradient-to-tr from-blue-50 via-white to-blue-50 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Supervision Summary</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
        >
          <FaPlus /> Add Session
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <p className="font-medium text-gray-900">Total Hours</p>
          <p className="text-xl font-semibold text-blue-700">{totalHours.toFixed(1)} hrs</p>
        </div>
        <div>
          <p className="font-medium text-gray-900">Make-Up Needed</p>
          <p className="text-red-600 font-semibold">{Math.max(0, (totalGoal - totalHours)).toFixed(1)} hrs</p>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600">Monthly Progress</label>
        <div className="w-full bg-blue-100 rounded-full h-3 mt-1">
          <div
            className="bg-blue-500 h-full transition-all duration-700 rounded-full"
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {totalHours.toFixed(1)} / {totalGoal} hrs ({percent.toFixed(1)}%)
        </p>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600">Last 4 Weeks</label>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={weeklyData}>
            <XAxis dataKey="week" fontSize={10} />
            <YAxis fontSize={10} hide />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {modalOpen && (
        <AddSupervisionSessionModal
          userId={userId}
          onClose={() => setModalOpen(false)}
          onSessionAdded={() => { /* Firestore snapshot updates automatically */ }}
        />
      )}
    </div>
  );
}

// Helper: groups sessions into last 4 weeks
function computeWeeklyData(sessions: SupervisionSession[]) {
  const now = new Date();
  const weeks: Record<string, number> = {};

  for (let i = 3; i >= 0; i--) {
    const start = new Date(now);
    start.setDate(start.getDate() - i * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const label = `Week ${4 - i}`;
    weeks[label] = 0;

    sessions.forEach((s) => {
      const sessionDate = new Date(s.date);
      if (sessionDate >= start && sessionDate <= end) {
        weeks[label] += s.hours;
      }
    });
  }

  return Object.entries(weeks).map(([week, hours]) => ({ week, hours }));
}
