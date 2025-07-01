import React from 'react';

const clients = [
  { name: 'Client A', goal: 'Requesting with PECS', mastered: 4, total: 8 },
  { name: 'Client B', goal: 'Toileting Routine', mastered: 2, total: 5 },
  { name: 'Client C', goal: 'Turn-taking with peers', mastered: 5, total: 6 },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function ClientSummaryCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Client Progress</h2>

      <ul className="divide-y">
        {clients.map((client, idx) => {
          const percent = (client.mastered / client.total) * 100;
          return (
            <li key={idx} className="py-3 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-semibold text-sm">
                {getInitials(client.name)}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-gray-800">{client.name}</p>
                <p className="text-xs text-gray-500">Goal: {client.goal}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-green-500 h-full rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {client.mastered} / {client.total} mastered
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
