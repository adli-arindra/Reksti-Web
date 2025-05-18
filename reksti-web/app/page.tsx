"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <div className="grid gap-4 w-full max-w-sm p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome</h1>

        <Link
          href="/sign-in"
          className="w-full block bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign In
        </Link>

        <Link
          href="/sign-up"
          className="w-full block bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Sign Up
        </Link>

        <Link
          href="/attend"
          className="w-full block bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
        >
          Attend
        </Link>

        <Link
          href="/class"
          className="w-full block bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Manage Class
        </Link>
      </div>
    </div>
  );
}
