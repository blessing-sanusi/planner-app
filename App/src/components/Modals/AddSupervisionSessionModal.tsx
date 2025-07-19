import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import axios from "axios";


interface AddSupervisionSessionModalProps {
  userId: string;
  onClose: () => void;
  onSessionAdded: () => void;
}

interface Client {
  id: string;
  name: string;
}
  // axios.defaults.baseURL = 'http://localhost:8000';

export default function AddSupervisionSessionModal({
  userId,
  onClose,
  onSessionAdded,
}: AddSupervisionSessionModalProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState({
    clientId: "",
    date: "",
    hours: "",
    type: "Direct Supervision",
    notes: "",
    makeupNeeded: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

// useEffect(() => {
//   axios
//     .get('/clients')
//     .then((res) => {
//       console.log('Clients fetched:', res.data);
//       setClients(res.data);
//     })
//     .catch((err) => {
//       console.error('Failed to fetch clients:', err);
//       setClients([]);
//     });
// }, []);


  useEffect(() => {
    async function fetchClients() {
      try {
        const clientsCol = collection(db, "clients");
        const clientSnapshot = await getDocs(clientsCol);
        const clientsList = clientSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Client, "id">),
        }));
        setClients(clientsList);
        console.log("Clients fetched from Firestore:", clientsList);
      } catch (error) {
        console.error("Failed to fetch clients from Firestore:", error);
        setClients([]);
      }
    }
    fetchClients();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.clientId) newErrors.clientId = "Please select a client.";
    if (!form.date) newErrors.date = "Please select a date.";
    if (!form.hours || isNaN(Number(form.hours)) || Number(form.hours) <= 0)
      newErrors.hours = "Please enter a valid number of hours.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    const payload = {
      ...form,
      userId,
      hours: parseFloat(form.hours),
      date: new Date(form.date).toISOString(),
    };

    // Send POST request to backend
    await axios.post("http://localhost:8000/sessions/", payload);

    onSessionAdded(); // trigger parent refetch or state update
    onClose(); // close modal
  } catch (err) {
    console.error("Error adding session:", err);
    setErrors({ form: "Failed to add session. Please try again." });
  }
};


  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-full max-w-md"
        noValidate
      >
        <h2 className="text-xl font-semibold">Add Supervision Session</h2>

        {errors.form && (
          <div className="text-red-600 mb-2 font-semibold">{errors.form}</div>
        )}

        <label className="block">
          Client:
          <select
            name="clientId"
            value={form.clientId}
            onChange={handleChange}
            className={`w-full mt-1 border p-2 rounded ${
              errors.clientId ? "border-red-600" : ""
            }`}
            required
          >
            <option value="">Select client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.clientId && <p className="text-red-600 text-sm">{errors.clientId}</p>}
        </label>

        <label className="block">
          Date:
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={`w-full mt-1 border p-2 rounded ${
              errors.date ? "border-red-600" : ""
            }`}
            required
          />
          {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}
        </label>

        <label className="block">
          Hours:
          <input
            type="number"
            step="0.1"
            name="hours"
            value={form.hours}
            onChange={handleChange}
            className={`w-full mt-1 border p-2 rounded ${
              errors.hours ? "border-red-600" : ""
            }`}
            min="0"
            required
          />
          {errors.hours && <p className="text-red-600 text-sm">{errors.hours}</p>}
        </label>

        <label className="block">
          Type:
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded"
          >
            <option>Direct Supervision</option>
            <option>Group Supervision</option>
            <option>Client Observation</option>
            <option>Feedback Session</option>
          </select>
        </label>

        <label className="block">
          Notes:
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className="w-full mt-1 border p-2 rounded"
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="makeupNeeded"
            checked={form.makeupNeeded}
            onChange={handleChange}
          />
          Mark as Make-Up Session
        </label>

        <div className="flex justify-end space-x-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
