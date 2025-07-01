import React from 'react';
import SupervisionSummaryCard from '../components/SupervisionSummaryCard';
import UpcomingSessionsCard from '../components/UpcomingSessionCard';
import ScheduleCalendar from '../components/ScheduleCalendar';

export default function Dashboard() {
  return (
    <main className="bg-gray-50 min-h-screen px-4 md:px-8 py-8 space-y-10">
      {/* Dashboard Header */}
      <header>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">👋 Welcome, BCBA</h1>
        <p className="text-gray-500 mt-1 text-sm md:text-base">Your central hub for supervision, session planning, and progress tracking.</p>
      </header>

      {/* Overview Cards (Add more later) */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <OverviewCard title="Total Clients" value="12" icon="👥" />
        <OverviewCard title="Hours This Month" value="14.5 hrs" icon="⏱️" />
        <OverviewCard title="Scheduled Sessions" value="8 this week" icon="📅" />
      </div> */}

      {/* Key Panels */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SupervisionSummaryCard />
        <UpcomingSessionsCard />
      </section>

      {/* Calendar */}
      <section className="bg-white rounded-2xl shadow-lg border p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">🗓️ Supervision Calendar</h2>
        <ScheduleCalendar />
      </section>
    </main>
  );
}
