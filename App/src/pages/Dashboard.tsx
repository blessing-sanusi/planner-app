import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut  } from 'firebase/auth';
import { auth } from '../lib/firebase';

import SupervisionSummaryCard from '../components/SupervisionSummaryCard';
import UpcomingSessionsCard from '../components/UpcomingSessionCard';
import ClientSummaryCard from '../components/ClientSummaryCard';
import ScheduleCalendar from '../components/ScheduleCalendar';
import ClientTaskListCard from '../components/ClientTaskListCard';

export default function Dashboard() {
const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState(null);


  useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/');
      } else {
        // Use displayName if available, otherwise fallback to email
        setUserName(user.displayName || user.email || 'User');
      }
    });

    return () => unsubscribe(); // clean up on unmount
  }, [navigate]);


  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
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

        <div className="max-w-6xl mx-auto mb-8">
    <SupervisionSummaryCard />
      </div>

  <section className="max-w-6xl mx-auto flex flex-col gap-8">
  <div className="w-full bg-white rounded-3xl shadow-md border border-gray-200 p-6 max-w-6xl mx-auto">
    <UpcomingSessionsCard />
  </div>
  <div className="w-full bg-white rounded-3xl shadow-md border border-gray-200 p-6 max-w-6xl mx-auto">
    <ClientSummaryCard />
  </div>
  <div className="w-full bg-white rounded-3xl shadow-md border border-gray-200 p-6 max-w-6xl mx-auto">
    <ClientTaskListCard />
  </div>
</section>



      {/* Calendar Section */}
      <section className="bg-white rounded-3xl shadow-md border border-gray-200 p-6 max-w-6xl mx-auto">
        {/* <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          🗓️ Supervision Calendar
        </h2> */}
        <div className="rounded-lg overflow-hidden h-[500px] sm:h-[600px]">
          <ScheduleCalendar />
        </div>

      </section>
    </main>
  );
}
