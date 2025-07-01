// pages/Login.tsx
import React from 'react';
import AuthForm from '../components/AuthForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side: Welcome illustration or message */}
        <div className="hidden md:flex flex-col items-start justify-center px-6">
          <h1 className="text-4xl font-bold text-indigo-800 mb-4 leading-snug">
            👋 Welcome to Your <br /> ABA Companion
          </h1>
          <p className="text-gray-600 text-lg">
            Track client progress, manage sessions, and stay organized — all in one place.
          </p>
          <img
            src="/aba-illustration.svg"
            alt="Illustration"
            className="mt-6 w-full max-w-xs drop-shadow-md"
          />
        </div>

        {/* Right side: Auth form */}
        <div className="bg-white shadow-xl rounded-3xl p-8 sm:p-10 border border-gray-200 w-full">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
