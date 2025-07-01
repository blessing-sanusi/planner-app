import React from 'react';
import SupervisionSummaryCard from '../components/SupervisionSummaryCard';
import UpcomingSessionsCard from '../components/UpcomingSessionCard';
import ScheduleCalendar from '../components/ScheduleCalendar';

export default function Dashboard() {
  return (
    <div className="px-4 md:px-8 py-6 space-y-8 bg-gray-50 min-h-screen">
      <header>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">👋 Welcome to Your ABA Planner</h1>
        <p className="text-gray-600 text-sm">Plan, track, and manage your BCBA supervision and sessions.</p>
      </header>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SupervisionSummaryCard />
        <UpcomingSessionsCard />
      </div>

      {/* Calendar Section */}
      <section className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">🗓️ Supervision Calendar</h2>
        <ScheduleCalendar />
      </section>
    </div>
  );
}
