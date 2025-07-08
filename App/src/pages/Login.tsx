import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

import HIPAABanner from '../components/HIPAABanner';
import AuthForm from '../components/AuthForm';

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe(); // cleanup listener on unmount
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-lg border border-gray-200 grid grid-cols-1 md:grid-cols-2">
        {/* Left side - intro content with illustration */}
        <div className="flex flex-col justify-center items-center px-12 py-16 max-w-md mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 leading-tight">
            👋 Welcome to Your <br /> Client Care Hub
          </h1>
          <div className="w-20 h-1 bg-indigo-400 rounded-full mb-6 mx-auto" />
          <p className="text-indigo-600 text-lg max-w-sm mb-10">
            Easily track client progress, manage sessions, and stay organized — all in one place.
          </p>

          {/* Subtle illustration SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-40 h-40 text-indigo-300"
            fill="none"
            viewBox="0 0 64 64"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="32" cy="32" r="30" strokeOpacity="0.2" />
            <path d="M20 32h24M32 20v24" />
          </svg>
        </div>

        {/* Right side - authentication form */}
        <div className="flex flex-col justify-center px-12 py-16 border-t md:border-t-0 md:border-l border-gray-200 max-w-md mx-auto">
          <AuthForm />
          <HIPAABanner />
        </div>
      </div>
    </div>
  );
}
