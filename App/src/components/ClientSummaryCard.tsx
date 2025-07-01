import React from 'react';

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


export default function ClientSummaryCard() {
  return (
    <div className={cardClass}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Client Progress</h2>

      <ul className="divide-y divide-gray-100">
        {clients.map((client, idx) => {
          const percent = (client.mastered / client.total) * 100;
          return (
            <li
              key={idx}
              className="py-6 flex items-start gap-6 hover:bg-indigo-50 rounded-xl transition cursor-pointer"
            >
              {/* Initials Circle */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr  text-white flex items-center justify-center font-semibold text-xl shadow-md select-none">
                {getInitials(client.name)}
              </div>

              {/* Client Info */}
              <div className="flex-1 space-y-1">
                <p className="text-xl font-semibold text-gray-900">{client.name}</p>
                <p className="text-sm text-gray-600 italic">Goal: {client.goal}</p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mt-3 overflow-hidden shadow-inner">
                   <div
                  className={`${getColor(percent)} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${percent}%` }}
                />
                </div>

                {/* Progress Text */}
                <p className="text-xs text-gray-500 mt-1 font-medium">
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
