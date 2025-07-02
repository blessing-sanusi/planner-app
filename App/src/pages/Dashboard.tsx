import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

import SupervisionSummaryCard from '../components/SupervisionSummaryCard';
import UpcomingSessionsCard from '../components/UpcomingSessionCard';
import ClientSummaryCard from '../components/ClientSummaryCard';
import ScheduleCalendar from '../components/ScheduleCalendar';

export default function Dashboard() {
const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate('/login');
      } else {
        // Try to get user's full name from user_metadata
        const name = data.session.user.user_metadata?.full_name || data.session.user.email || '';
        setUserName(name);
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <main className="bg-gray-50 min-h-screen p-8 max-w-7xl mx-auto space-y-12">
    <header className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-12">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            👋 Welcome, {userName || 'User'}
          </h1>
          <p className="text-gray-600 text-lg max-w-xl">
            Your hub to manage client sessions, supervision, and progress.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
          aria-label="Logout"
        >
          Logout
        </button>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Supervision Summary - spans all columns on large screens */}
        <div className="col-span-1 lg:col-span-3">
          <SupervisionSummaryCard />
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6">
          <UpcomingSessionsCard />
        </div>

        {/* Client Progress */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6">
          <ClientSummaryCard />
        </div>
      </section>

      {/* Calendar Section */}
      <section className="bg-white rounded-3xl shadow-md border border-gray-200 p-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          🗓️ Supervision Calendar
        </h2>
        <div style={{ height: 500 }} className="rounded-lg overflow-hidden">
          <ScheduleCalendar />
        </div>
      </section>
    </main>
  );
}
