import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function UpdateGoalModal({
  client,
  onClose,
}: {
  client: any;
  onClose: () => void;
}) {
  const [goal, setGoal] = useState(client.goal || '');
  const [mastered, setMastered] = useState(client.mastered || 0);
  const [total, setTotal] = useState(client.total || 0);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!goal.trim()) {
      setError('Goal cannot be empty');
      return;
    }
    if (mastered < 0 || total < 0 || mastered > total) {
      setError('Please check mastered and total goals values');
      return;
    }

    try {
      const clientRef = doc(db, 'clients', client.id);
      await updateDoc(clientRef, { goal, mastered, total });
      onClose();
    } catch (err) {
      setError('Failed to update goal');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Update Goal for {client.name}</h3>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
        />
        <input
          type="number"
          placeholder="Mastered"
          value={mastered}
          onChange={(e) => setMastered(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
          min={0}
        />
        <input
          type="number"
          placeholder="Total"
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
          min={0}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700"
          >
            Save Goal
          </button>
        </div>
      </div>
    </div>
  );
}
