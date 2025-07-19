'use client';

import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Task {
  id: string;
  title: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  client: string;
}

export default function ClientTaskListCard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [clientName, setClientName] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tasks'));
        const taskList: Task[] = [];

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.title && data.status && data.client) {
            taskList.push({
              id: docSnap.id,
              title: data.title,
              status: data.status,
              client: data.client,
            });
          }
        });

        setTasks(taskList);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask || !clientName) return;

    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        title: newTask,
        status: 'Not Started',
        client: clientName,
      });

      setTasks((prev) => [
        ...prev,
        { id: docRef.id, title: newTask, status: 'Not Started', client: clientName },
      ]);

      setNewTask('');
      setClientName('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const updateTaskStatus = async (id: string, newStatus: Task['status']) => {
    try {
      const taskRef = doc(db, 'tasks', id);
      await updateDoc(taskRef, { status: newStatus });

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
  <div className="w-full p-6 bg-white rounded-2xl shadow-md border border-gray-200">
    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
      🎯 Client To-Do List
    </h2>

    {/* Input area */}
    <div className="flex flex-col sm:flex-row gap-6 mb-8">
      <input
        type="text"
        placeholder="Client name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        placeholder="New task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-2 border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleAddTask}
        disabled={!newTask || !clientName}
        className="bg-indigo-600 disabled:bg-indigo-300 text-white rounded-lg px-6 py-3 font-semibold transition hover:bg-indigo-700 disabled:cursor-not-allowed"
      >
        Add Task
      </button>
    </div>

    {/* Tasks list */}
    <ul className="space-y-6">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 rounded-xl shadow-inner p-5 border border-gray-200"
        >
          <div className="mb-4 sm:mb-0 max-w-[60%]">
            <p className="text-lg font-semibold text-gray-800">{task.title}</p>
            <p className="text-sm text-gray-500">Client: {task.client}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full sm:w-auto">
            <select
              value={task.status}
              onChange={(e) => updateTaskStatus(task.id, e.target.value as Task['status'])}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              onClick={() => removeTask(task.id)}
              className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2 text-sm transition"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

}
