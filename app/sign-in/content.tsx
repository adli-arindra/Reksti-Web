// SignInPageContent.jsx (or wherever your original code now resides)
"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "../context/user-context";
import Link from "next/link";

export default function SignInPageContent() { // Renamed for clarity, if you moved it
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const { nim, full_name, classes, setUser } = useUser();

    // Check for success message from registration
    useEffect(() => {
        if (searchParams?.get('success') === 'registered') {
            setSuccessMessage("Account created successfully! Please sign in.");
        }
    }, [searchParams]);

    const handleSignIn = async () => {
        if (!input.trim()) {
            setError("NIM is required");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + "/student", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "nim": input,
                },
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                setUser({
                    nim: input,
                    full_name: data.nama,
                    classes: data.class_uids
                });

                // Success feedback and redirect
                setSuccessMessage(`Welcome back, ${data.nama}!`);
                setTimeout(() => {
                    router.push("/dashboard"); // or wherever you want to redirect
                }, 1500);

            } else if (res.status === 404) {
                setError("User not found. Please check your NIM or sign up first.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("Unable to connect to server. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSignIn();
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Navigation */}
            <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center">
                            <div className="bg-blue-600 rounded-lg p-2 mr-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <span className="text-xl font-bold">AttendanceX</span>
                        </Link>

                        <Link href="/" className="text-slate-300 hover:text-white transition-colors flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                            Back
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex items-center justify-center px-4 py-20">
                <div className="max-w-md w-full">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                            <p className="text-slate-400">Sign in to your AttendanceX account</p>
                        </div>

                        {/* Success Message */}
                        {successMessage && (
                            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <p className="text-green-400 text-sm">{successMessage}</p>
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <div className="space-y-6">
                            {/* NIM Input */}
                            <div>
                                <label htmlFor="nim" className="block text-slate-300 text-sm font-medium mb-2">
                                    Student ID (NIM)
                                </label>
                                <div className="relative">
                                    <input
                                        id="nim"
                                        name="nim"
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Enter your NIM"
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-12"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <p className="text-red-400 text-sm">{error}</p>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                onClick={handleSignIn}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing In...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                        </svg>
                                        Sign In
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-slate-900 text-slate-400">New to AttendanceX?</span>
                                </div>
                            </div>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <p className="text-slate-400 text-sm mb-4">
                                    Don't have an account yet?
                                </p>
                                <button
                                    onClick={() => router.push("/sign-up")}
                                    className="w-full bg-slate-800 border border-slate-700 hover:border-slate-600 hover:bg-slate-700 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                                    </svg>
                                    Create New Account
                                </button>
                            </div>
                        </div>

                        {/* Quick Access Info */}
                        <div className="mt-8 pt-6 border-t border-slate-800">
                            <div className="text-center">
                                <p className="text-slate-500 text-xs mb-2">Quick Access Features</p>
                                <div className="flex justify-center space-x-4 text-xs">
                                    <span className="text-slate-400">✓ Face Recognition</span>
                                    <span className="text-slate-400">✓ Real-time Tracking</span>
                                    <span className="text-slate-400">✓ Class Management</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}