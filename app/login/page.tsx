"use client";

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation'; // <--- Import useRouter

// --- Hardcoded Credentials (FOR DEMONSTRATION ONLY) ---
const FIXED_EMAIL = "admin@example.com";
const FIXED_PASSWORD = "password123";
// -------------------------------------------------------

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // <--- Initialize router

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Both email and password are required.');
      setLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

    if (email === FIXED_EMAIL && password === FIXED_PASSWORD) {
      console.log('Login successful with fixed credentials.');
      // alert(`Login Successful!\nWelcome, ${email}!`); // Optional: remove alert if redirecting immediately
      router.push('/admin/dashboard'); // <--- Redirect to dashboard
    } else {
      console.log('Login failed: Invalid credentials.');
      setError('Invalid email or password. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/Logo.png"
              alt="Dr. Yogita Physiotherapy Logo"
              width={80}
              height={80}
              className="rounded-full shadow-md mb-4"
              priority
            />
          </Link>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-800">
            Admin Sign In
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your account dashboard.
          </p>
          <p className="mt-1 text-center text-xs text-gray-500">
            (Test with: {FIXED_EMAIL} / {FIXED_PASSWORD})
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="bg-white p-8 shadow-xl rounded-lg"
        >
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-center text-red-600 bg-red-50 p-2 rounded-md">
                {error}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-pink-300 disabled:cursor-not-allowed transition-colors duration-150"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
        </motion.div>
        
        <p className="mt-8 text-center text-xs text-gray-500">
          <Link href="/" className="font-medium text-pink-600 hover:text-pink-500">
            ← Back to homepage
          </Link>
        </p>
      </div>
    </motion.div>
  );
}