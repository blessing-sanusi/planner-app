import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthForm() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');  // new state for name
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

    if (mode === 'register' && !name.trim()) {
      setError('Please enter your name.');
      return;
    }

    try {
      if (mode === 'login') {
        // Login
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        navigate('/dashboard')
      } else {
        // Register - send name as user_metadata
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
          },
        });
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (error: any) {
      setError(error.message || 'Something went wrong.');
      return;
    }

    // Redirect or refresh handled outside this component or with a useEffect listener
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800">
        {mode === 'login' ? 'Login to Your Account' : 'Create an Account'}
      </h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="space-y-4">
        {mode === 'register' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              required={mode === 'register'}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            />
          </div>
        )}

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
