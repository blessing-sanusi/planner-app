import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function AuthForm() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const toggleMode = () => {
    setError('');
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  // ✅ Redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // navigate('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'register' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        // Redirect happens automatically via onAuthStateChanged
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        // Redirect happens automatically via onAuthStateChanged
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    }
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
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              required
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
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            required
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
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            required
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
