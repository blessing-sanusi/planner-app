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
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 bg-gradient-to-tr from-blue-50 via-white to-blue-50 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-blue-700">
        {/* <FaChartLine className="text-lg" /> */}
        <h2 className="text-lg font-semibold text-gray-800">Supervision Summary</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <p className="font-medium text-gray-900">Total Hours</p>
          <p className="text-xl font-semibold text-blue-700">{completed} hrs</p>
        </div>
        <div>
          <p className="font-medium text-gray-900 flex items-center gap-1">
            Make-Up Needed 
          </p>
          <p className="text-red-600 font-semibold">1 hr</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <label className="text-xs font-medium text-gray-600">Monthly Progress</label>
        <div className="w-full bg-blue-100 rounded-full h-3 mt-1">
          <div
            className="bg-blue-500 h-full transition-all duration-700 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">{completed} / {totalGoal} hrs ({percent.toFixed(1)}%)</p>
      </div>

      {/* Line Chart */}
      <div>
        <label className="text-xs font-medium text-gray-600">Last 4 Weeks</label>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={data}>
            <XAxis dataKey="week" fontSize={10} />
            <YAxis fontSize={10} hide />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
