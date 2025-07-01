import React from 'react';
import { FaChartLine, FaExclamationTriangle } from 'react-icons/fa';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

const data = [
  { week: 'Week 1', hours: 3.5 },
  { week: 'Week 2', hours: 5 },
  { week: 'Week 3', hours: 4 },
  { week: 'Week 4', hours: 6.5 },
];

export default function SupervisionSummaryCard() {
  const totalGoal = 20;
  const completed = 14;
  const percent = (completed / totalGoal) * 100;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-200">
      <div className="flex items-center gap-2 text-blue-600">
        <FaChartLine className="text-lg" />
        <h2 className="text-lg font-semibold text-gray-800">Supervision Summary</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <p className="font-medium text-gray-900">Total Hours</p>
          <p>8.5 hrs</p>
        </div>
        <div>
          <p className="font-medium text-gray-900">Make-Up Needed <FaExclamationTriangle className="inline text-yellow-500 text-xs" /></p>
          <p className="text-red-600 font-semibold">1 hr</p>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500">Monthly Progress</label>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
          <div className="bg-blue-500 h-full transition-all duration-500 rounded-full" style={{ width: `${percent}%` }} />
        </div>
        <p className="text-xs text-gray-500 mt-1">{completed} / {totalGoal} hrs</p>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500">Last 4 Weeks</label>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={data}>
            <XAxis dataKey="week" fontSize={10} />
            <YAxis fontSize={10} hide />
            <Tooltip />
            <Line type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
