import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function AddNoteModal({
  client,
  onClose,
}: {
  client: any;
  onClose: () => void;
}) {
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!note.trim()) {
      setError('Note cannot be empty');
      return;
    }

    try {
      const clientRef = doc(db, 'clients', client.id);
      await updateDoc(clientRef, {
        notes: arrayUnion({
          text: note,
          createdAt: new Date().toISOString(),
        }),
      });
      onClose();
    } catch (err) {
      setError('Failed to add note');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Add Note for {client.name}</h3>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <textarea
          rows={4}
          placeholder="Write your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
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
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}
