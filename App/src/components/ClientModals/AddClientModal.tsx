import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function AddClientModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [totalGoals, setTotalGoals] = useState<number | ''>('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (!name.trim()) {
      setError('Client name is required');
      return;
    }
    if (!goal.trim()) {
      setError('Initial goal is required');
      return;
    }
    if (totalGoals === '' || totalGoals <= 0) {
      setError('Total goals must be greater than zero');
      return;
    }

    try {
      await addDoc(collection(db, 'clients'), {
        name: name.trim(),
        goal: goal.trim(),
        mastered: 0,
        total: totalGoals,
        notes: [],
      });
      onClose();
    } catch (err) {
      setError('Failed to add client');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Client</h3>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <label className="block mb-2 font-medium text-gray-700">
          Client Name
          <input
            type="text"
            placeholder="e.g., John Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            The client’s full name.
          </p>
        </label>

        <label className="block mb-2 font-medium text-gray-700">
          Initial Goal
          <input
            type="text"
            placeholder="e.g., Requesting with PECS"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            The primary skill or behavior to focus on initially.
          </p>
        </label>

        <label className="block mb-2 font-medium text-gray-700">
          Total Goals
          <input
            type="number"
            placeholder="e.g., 8"
            value={totalGoals}
            onChange={(e) => setTotalGoals(e.target.value === '' ? '' : parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            min={1}
          />
          <p className="text-xs text-gray-500 mt-1">
            Total number of goals planned for this client. This helps track progress.
          </p>
        </label>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Add Client
          </button>
        </div>
      </div>
    </div>
  );
}
