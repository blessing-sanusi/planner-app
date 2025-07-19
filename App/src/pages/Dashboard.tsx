import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

import SupervisionSummaryCard from '../components/SupervisionSummaryCard';
import UpcomingSessionsCard from '../components/UpcomingSessionCard';
import ClientSummaryCard from '../components/ClientSummaryCard';
import ScheduleCalendar from '../components/ScheduleCalendar';
import ClientTaskListCard from '../components/ClientTaskListCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) navigate('/');
      else setUserName(user.displayName || user.email || 'User');
    });
    return unsubscribe;
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <main className="bg-gray-50 min-h-screen p-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          👋 Welcome, <span className="text-indigo-600">{userName}</span>
        </h1>
        <button
          onClick={handleLogout}
          className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-6 py-2 shadow-sm transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16v1a2 2 0 002 2h3m4-9v-1a2 2 0 00-2-2h-3" />
          </svg>
          Logout
        </button>
      </header>

      {/* Supervision Summary */}
      <div className="card">
        <SupervisionSummaryCard />
      </div>

      {/* Core Cards */}
      <section className="space-y-8">
        <div className="card">
          <UpcomingSessionsCard />
        </div>
        <div className="card">
          <ClientSummaryCard />
        </div>
        <div className="card">
          <ClientTaskListCard />
        </div>
      </section>

      {/* Calendar */}
      <section className="card">
        {/* <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          🗓️ Supervision Calendar
        </h2> */}
        <div className="overflow-hidden rounded-lg h-[500px] md:h-[600px]">
          <ScheduleCalendar />
        </div>
      </section>
    </main>
  );
}
