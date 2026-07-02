'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
} from 'lucide-react';

import { api } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const res = await api.post<{
        success: boolean;
        token: string;
        data: {
          name: string;
          email: string;
          role: string;
        };
      }>('/admin/auth/login', {
        email,
        password,
      });

      localStorage.setItem(
        'emb_admin_token',
        res.token
      );

      localStorage.setItem(
        'emb_admin_user',
        JSON.stringify(res.data)
      );

      router.push('/admin/dashboard');
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Invalid credentials'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex h-screen items-center justify-center overflow-hidden bg-[#F5F8FF] px-6 py-6">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[#FDF8EE]0/10 blur-[140px]" />

        <div className="absolute bottom-[-250px] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full border border-blue-200/40" />

        <div className="absolute bottom-[-320px] left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full border border-blue-100/60" />

        <div className="absolute bottom-[-420px] left-1/2 h-[1100px] w-[1100px] -translate-x-1/2 rounded-full border border-slate-200/50" />

      </div>

      {/* Login Card */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md rounded-[28px] border border-slate-200 bg-white px-8 py-7 shadow-[0_20px_60px_rgba(37,99,235,0.12)]"
      >

        {/* Logo */}

        <div className="text-center">

          <Image
            src="/logo.png"
            alt="EMB"
            width={90}
            height={90}
            className="mx-auto"
          />

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">

            <div className="h-px w-28 bg-slate-200" />

            <div className="h-2 w-2 rounded-full bg-blue-600" />

            <div className="h-px w-28 bg-slate-200" />

          </div>

          <h1 className="mt-8 text-3xl font-black tracking-tight text-slate-900">

            Welcome Back

          </h1>

          <p className="mt-2 text-base text-slate-500">

            Sign in to continue managing your enterprise.

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-7"
        >
          {/* Email */}

          <div>

            <label className="mb-3 block text-sm font-semibold text-slate-800">
              Email Address
            </label>

            <div className="relative">

              <Mail className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                className="h-10 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-5 text-[15px] text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="mb-1 block text-sm font-semibold text-slate-800">
              Password
            </label>

            <div className="relative">

              <Lock className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-14 text-[15px] text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

            </div>

          </div>

          {/* Remember */}

          <div className="flex items-center justify-between">

            <label className="flex items-center gap-3 text-sm text-slate-600">

              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-blue-600"
              />

              Remember me

            </label>

            <button
              type="button"
              className="text-sm font-medium text-[#A9782D] transition hover:text-blue-700"
            >
              Forgot Password?
            </button>

          </div>

          {/* Error */}

          {error && (

            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">

              {error}

            </div>

          )}

          {/* Sign In */}

          <button
            type="submit"
            disabled={loading}
            className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {loading ? (

              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Signing In...
              </>

            ) : (

              <>
                Sign In
                <ArrowRight className="h-5 w-5" />
              </>

            )}

          </button>




        </form>

      </motion.div>


    </main>

  );

}