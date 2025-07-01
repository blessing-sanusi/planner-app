import React, { useState } from 'react';
import { FaChartLine, FaExclamationTriangle, FaPlus } from 'react-icons/fa';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Dialog } from '@headlessui/react';

const initialHours = [
  { week: 'Week 1', hours: 3.5 },
  { week: 'Week 2', hours: 5 },
  { week: 'Week 3', hours: 4 },
  { week: 'Week 4', hours: 6.5 },
];

export default function SupervisionSummaryCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState(initialHours);
  const totalGoal = 20;
  const completed = hours.reduce((acc, cur) => acc + cur.hours, 0);
  const percent = (completed / totalGoal) * 100;

  const [newEntry, setNewEntry] = useState({ week: '', hours: '' });

  const addHours = () => {
    setHours(prev => [...prev, { ...newEntry, hours: parseFloat(newEntry.hours) }]);
    setNewEntry({ week: '', hours: '' });
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600">
          <FaChartLine className="text-lg" />
          <h2 className="text-xl font-semibold text-gray-800">Supervision Summary</h2>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1 text-xs px-3 py-1 border border-blue-400 text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100 transition"
        >
          <FaPlus className="text-xs" />
          Add Hours
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <p className="font-medium text-gray-900">Total Hours</p>
          <p>{completed.toFixed(1)} hrs</p>
        </div>
        <div>
          <p className="font-medium text-gray-900">
            Make-Up Needed{' '}
            <FaExclamationTriangle className="inline text-yellow-500 text-xs" />
          </p>
          <p className="text-red-600 font-semibold">
            {(totalGoal - completed).toFixed(1)} hrs
          </p>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500">Monthly Progress</label>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
          <div
            className="bg-blue-500 h-full transition-all duration-500 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {completed.toFixed(1)} / {totalGoal} hrs
        </p>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500">Last 4 Weeks</label>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={hours.slice(-4)}>
            <XAxis dataKey="week" fontSize={10} />
            <YAxis fontSize={10} hide />
            <Tooltip />
            <Line type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Add Hours Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4">
            <Dialog.Title className="text-lg font-semibold text-gray-800">Add Supervision Hours</Dialog.Title>
            <div className="space-y-3 text-sm">
              <input
                type="text"
                value={newEntry.week}
                onChange={(e) => setNewEntry({ ...newEntry, week: e.target.value })}
                placeholder="Week (e.g. Week 5)"
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
              <input
                type="number"
                value={newEntry.hours}
                onChange={(e) => setNewEntry({ ...newEntry, hours: e.target.value })}
                placeholder="Hours"
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button onClick={() => setIsOpen(false)} className="text-sm px-4 py-1 rounded-md border">Cancel</button>
              <button onClick={addHours} className="text-sm px-4 py-1 rounded-md bg-blue-600 text-white">Add</button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
