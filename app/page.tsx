"use client";
import Link from "next/link";

export default function HomePage() {
  console.log(process.env.NEXT_PUBLIC_ENDPOINT);
  return (
      <div className="min-h-screen bg-slate-950 text-white">
        {/* Navigation */}
        <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div className="bg-blue-600 rounded-lg p-2 mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span className="text-xl font-bold">AttendanceX</span>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <Link href="#" className="text-slate-300 hover:text-white transition-colors">Home</Link>
                <Link href="/features" className="text-slate-300 hover:text-white transition-colors">Features</Link>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button className="text-slate-300 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full">
            {/* Header Section */}
            <div className="text-center mb-12">
              {/* Status Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-400 text-sm font-medium">100% Secure</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Welcome to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                AttendanceX
              </span>
              </h1>
              <p className="text-slate-400 text-lg mb-8">
                Smart attendance management with facial recognition technology
              </p>
            </div>

            {/* Action Cards */}
            <div className="grid gap-4">
              <Link
                  href="/sign-in"
                  className="group w-full bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-6 transition-all hover:bg-slate-800/50"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-500/20 transition-colors">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white mb-1">Sign In</h3>
                    <p className="text-slate-400 text-sm">Access your account and view attendance history</p>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 ml-auto group-hover:text-slate-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </Link>

              <Link
                  href="/sign-up"
                  className="group w-full bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-6 transition-all hover:bg-slate-800/50"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-500/20 transition-colors">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white mb-1">Sign Up</h3>
                    <p className="text-slate-400 text-sm">Create new account with facial recognition</p>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 ml-auto group-hover:text-slate-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </Link>

              <Link
                  href="/attend"
                  className="group w-full bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-6 transition-all hover:bg-slate-800/50"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-yellow-500/20 transition-colors">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white mb-1">Mark Attendance</h3>
                    <p className="text-slate-400 text-sm">Quick check-in using facial recognition</p>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 ml-auto group-hover:text-slate-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </Link>

              <Link
                  href="/class"
                  className="group w-full bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-6 transition-all hover:bg-slate-800/50"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-500/20 transition-colors">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white mb-1">Manage Classes</h3>
                    <p className="text-slate-400 text-sm">Create and oversee class attendance</p>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 ml-auto group-hover:text-slate-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </Link>
            </div>

            {/* Footer */}
            <div className="text-center mt-12">
              <p className="text-slate-500 text-sm">
                Secure • Fast • Reliable
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}