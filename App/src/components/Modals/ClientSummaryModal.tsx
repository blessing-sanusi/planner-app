import React from 'react';

export default function ClientSummaryModal({
  client,
  onClose,
}: {
  client: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{client.name} - Summary</h3>

        <p><strong>Goal:</strong> {client.goal || 'No goal set'}</p>
        <p><strong>Mastered:</strong> {client.mastered || 0} / {client.total || 0}</p>

        <h4 className="mt-4 font-semibold text-lg">Notes</h4>
        {client.notes && client.notes.length > 0 ? (
          <ul className="list-disc ml-5 max-h-48 overflow-y-auto">
            {client.notes.map((note: any, idx: number) => (
              <li key={idx} className="mb-2">
                <p>{note.text}</p>
                <p className="text-xs text-gray-400 italic">{new Date(note.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-gray-500">No notes available.</p>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
