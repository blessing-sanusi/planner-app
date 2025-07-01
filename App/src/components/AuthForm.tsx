// components/AuthForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

export default function AuthForm() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const toggleMode = () => {
    setError('');
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = mode === 'login' ? '/login' : '/register';
      const response = await axios.post(`http://localhost:8000${endpoint}`, null, {
        params: { email, password },
      });
      localStorage.setItem('token', response.data.access_token);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800">
        {mode === 'login' ? 'Login to Your Account' : 'Create an Account'}
      </h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
      >
        {mode === 'login' ? 'Login' : 'Register'}
      </button>

      <p className="text-sm text-gray-600 text-center">
        {mode === 'login' ? "Don't have an account?" : 'Already registered?'}{' '}
        <button onClick={toggleMode} type="button" className="text-indigo-600 font-semibold hover:underline">
          {mode === 'login' ? 'Create one' : 'Login instead'}
        </button>
      </p>
    </form>
  );
}
