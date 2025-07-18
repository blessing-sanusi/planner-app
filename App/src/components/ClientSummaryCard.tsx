import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import AddClientModal from './ClientModals/AddClientModal';
import AddNoteModal from './ClientModals/AddNoteModal';
import UpdateGoalModal from './ClientModals/UpdateGoalModal';
import ClientSummaryModal from './ClientModals/ClientSummaryModal';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function getColor(percent: number) {
  if (percent >= 100) return 'bg-green-500';
  if (percent >= 50) return 'bg-yellow-400';
  return 'bg-red-400';
}

function getStatus(percent: number) {
  if (percent >= 100) return { text: 'Mastered', color: 'green' };
  if (percent >= 50) return { text: 'Progressing', color: 'yellow' };
  return { text: 'Needs Review', color: 'red' };
}

export default function ClientSummaryCard() {
  const [clients, setClients] = useState<any[]>([]);
  const [modal, setModal] = useState<'addClient' | 'note' | 'goal' | 'summary' | null>(null);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'clients'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClients(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 max-w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Client Progress</h2>
        <button
          onClick={() => setModal('addClient')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          + Add Client
        </button>
      </div>

      <ul className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
        {clients.map((client) => {
          const percent = client.total ? (client.mastered / client.total) * 100 : 0;
          const status = getStatus(percent);

          return (
            <li
              key={client.id}
              className="py-6 flex flex-col sm:flex-row sm:items-start sm:gap-6 hover:bg-indigo-50 rounded-xl transition cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-xl shadow-md mb-4 sm:mb-0">
                {getInitials(client.name)}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-900">{client.name}</p>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full bg-${status.color}-100 text-${status.color}-700`}
                  >
                    {status.text}
                  </span>
                </div>

                <p className="text-sm text-gray-600 italic">Goal: {client.goal || 'No goal set'}</p>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className={`${getColor(percent)} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  {client.mastered || 0} of {client.total || 0} goals mastered
                </p>

                <div className="flex gap-2 mt-2 flex-wrap">
                  <button
                    onClick={() => {
                      setSelectedClient(client);
                      setModal('note');
                    }}
                    className="text-sm px-3 py-1 bg-indigo-100 text-indigo-700 font-medium rounded-lg hover:bg-indigo-200"
                  >
                    Add Note
                  </button>
                  <button
                    onClick={() => {
                      setSelectedClient(client);
                      setModal('goal');
                    }}
                    className="text-sm px-3 py-1 bg-yellow-100 text-yellow-800 font-medium rounded-lg hover:bg-yellow-200"
                  >
                    Update Goal
                  </button>
                  <button
                    onClick={() => {
                      setSelectedClient(client);
                      setModal('summary');
                    }}
                    className="mt-3 inline-flex items-center text-indigo-600 text-sm font-semibold hover:underline"
                  >
                    View Summary
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Modals */}
      {modal === 'addClient' && <AddClientModal onClose={() => setModal(null)} />}
      {modal === 'note' && selectedClient && (
        <AddNoteModal client={selectedClient} onClose={() => setModal(null)} />
      )}
      {modal === 'goal' && selectedClient && (
        <UpdateGoalModal client={selectedClient} onClose={() => setModal(null)} />
      )}
      {modal === 'summary' && selectedClient && (
        <ClientSummaryModal client={selectedClient} onClose={() => setModal(null)} />
      )}
    </div>
  );
}
