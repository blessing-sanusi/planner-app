import React from 'react';
import SupervisionSummaryCard from '../components/SupervisionSummaryCard';
import UpcomingSessionsCard from '../components/UpcomingSessionCard';
import ClientSummaryCard from '../components/ClientSummaryCard';
import ScheduleCalendar from '../components/ScheduleCalendar';

export default function Dashboard() {
  return (
    <main className="bg-gray-50 min-h-screen p-8 space-y-10 max-w-7xl mx-auto">
      <header className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">👋 Welcome, Bukola Akinwale</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Your hub to manage client sessions, supervision, and progress.
        </p>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Supervision Summary - full width on large screens */}
        <div className="col-span-1 lg:col-span-3">
          <SupervisionSummaryCard />
        </div>

        {/* Upcoming Sessions & Client Progress side-by-side */}
        <UpcomingSessionsCard />
        <ClientSummaryCard />
      </section>


      {/* Calendar Section */}
      <section className="bg-white rounded-3xl shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">🗓️ Supervision Calendar</h2>
        <div style={{ height: 500 }} className="rounded-lg overflow-hidden">
        <ScheduleCalendar />
        </div>
      </section>
    </main>
  );
}
