// File: components/ClientSummaryCard.tsx
import React, { useState } from 'react';
import ClientSlideOver from './ClientSlideOver';

const clients = [
  { name: 'Client A', goal: 'Requesting with PECS', mastered: 4, total: 8 },
  { name: 'Client B', goal: 'Toileting Routine', mastered: 2, total: 5 },
  { name: 'Client C', goal: 'Turn-taking with peers', mastered: 5, total: 6 },
];

const cardClass =
  "bg-white rounded-3xl shadow-md border border-gray-200 p-8 flex flex-col";

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
  const [modal, setModal] = useState<'note' | 'goal' | 'summary' | null>(null);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const openModal = (type: 'note' | 'goal' | 'summary', client: any) => {
    setSelectedClient(client);
    setModal(type);
  };

  const closeModal = () => {
    setModal(null);
    setSelectedClient(null);
  };

  return (
    <div className={cardClass}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Client Progress</h2>

      <ul className="divide-y divide-gray-100">
        {clients.map((client, idx) => {
          const percent = (client.mastered / client.total) * 100;
          const status = getStatus(percent);

          return (
            <li
              key={idx}
              className="py-6 flex flex-col sm:flex-row sm:items-start sm:gap-6 hover:bg-indigo-50 rounded-xl transition"
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

                <p className="text-sm text-gray-600 italic">Goal: {client.goal}</p>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className={`${getColor(percent)} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  {client.mastered} of {client.total} goals mastered
                </p>

                <div className="flex gap-2 mt-2 flex-wrap">
                  <button
                    onClick={() => openModal('note', client)}
                    className="text-sm px-3 py-1 bg-indigo-100 text-indigo-700 font-medium rounded-lg hover:bg-indigo-200"
                  >
                    Add Note
                  </button>
                  <button
                    onClick={() => openModal('goal', client)}
                    className="text-sm px-3 py-1 bg-yellow-100 text-yellow-800 font-medium rounded-lg hover:bg-yellow-200"
                  >
                    Update Goal
                  </button>
                  <button
                    onClick={() => openModal('summary', client)}
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

      {/* Modal */}
      {modal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {modal === 'note' && 'Add Note'}
              {modal === 'goal' && 'Update Goal'}
              {modal === 'summary' && 'Client Summary'}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Client: <strong>{selectedClient.name}</strong>
            </p>

            {modal === 'note' && (
              <textarea
                rows={4}
                placeholder="Write your note here..."
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            )}

            {modal === 'goal' && (
              <input
                type="text"
                placeholder="Update goal..."
                defaultValue={selectedClient.goal}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            )}

            {modal === 'summary' && (
              <p className="text-gray-700">
                <strong>Goal:</strong> {selectedClient.goal} <br />
                <strong>Mastered:</strong> {selectedClient.mastered} / {selectedClient.total}
              </p>
            )}

            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
