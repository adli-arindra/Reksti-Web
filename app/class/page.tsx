"use client";
import Link from "next/link";
import { useState } from "react";

export default function ClassPage() {
    const [classUid, setClassUid] = useState("");
    const [students, setStudents] = useState<{ nim: string, status: boolean }[] | null>(null);
    const [notFound, setNotFound] = useState(false);
    const [newStudents, setNewStudents] = useState<string[]>([""]);
    const [newClassUid, setNewClassUid] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [nimErrors, setNimErrors] = useState<string[]>([""]);
    const [isLoadingCheck, setIsLoadingCheck] = useState(false);
    const [isLoadingCreate, setIsLoadingCreate] = useState(false);

    const handleCheckClass = async () => {
        setError("");
        setSuccess("");
        setStudents(null);
        setNotFound(false);
        setIsLoadingCheck(true);

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + "/class", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "class-uid": classUid,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setStudents(data.students.map((s: { NIM: string, status: boolean }) => ({
                    nim: s.NIM,
                    status: s.status,
                })));
            } else {
                setNotFound(true);
            }
        } catch {
            setError("Unable to connect to server. Please check your connection.");
        } finally {
            setIsLoadingCheck(false);
        }
    };

    const validateNims = async (nims: string[]) => {
        const results = await Promise.all(
            nims.map(async (nim) => {
                const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + "/student", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        nim,
                    },
                });
                return res.ok;
            })
        );

        const newErrors = results.map((valid, i) =>
            valid ? "" : `NIM "${newStudents[i]}" not found`
        );
        setNimErrors(newErrors);
        return results.every((valid) => valid);
    };

    const handleCreateClass = async () => {
        const filtered = newStudents.map((s) => s.trim()).filter(s => s !== "");
        if (filtered.length === 0) {
            setError("Add at least one student NIM");
            return;
        }

        setIsLoadingCreate(true);
        setError("");

        const allValid = await validateNims(filtered);
        if (!allValid) {
            setError("Some NIMs are invalid. Please check and try again.");
            setIsLoadingCreate(false);
            return;
        }

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + "/class", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ student: filtered }),
            });

            const data = await res.json();
            if (res.ok && data.status) {
                setSuccess(`Class created successfully!`);
                setNewClassUid(data.class_uid);
                setNotFound(false);
                setError("");
                // Reset form
                setNewStudents([""]);
                setNimErrors([""]);
            } else {
                setError("Failed to create class. Please try again.");
            }
        } catch {
            setError("Unable to connect to server. Please check your connection.");
        } finally {
            setIsLoadingCreate(false);
        }
    };

    const addStudentField = () => {
        setNewStudents([...newStudents, ""]);
        setNimErrors([...nimErrors, ""]);
    };

    const removeStudentField = (index: number) => {
        if (newStudents.length > 1) {
            const newStudentsCopy = newStudents.filter((_, i) => i !== index);
            const newErrorsCopy = nimErrors.filter((_, i) => i !== index);
            setNewStudents(newStudentsCopy);
            setNimErrors(newErrorsCopy);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
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
            <div className="flex items-center justify-center px-4 py-12">
                <div className="max-w-2xl w-full">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Class Management</h1>
                            <p className="text-slate-400">View existing classes or create new ones</p>
                        </div>

                        {/* Check Class Section */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">
                                    Search Existing Class
                                </label>
                                <div className="flex space-x-3">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            value={classUid}
                                            onChange={(e) => setClassUid(e.target.value)}
                                            placeholder="Enter class UID"
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pl-12"
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleCheckClass}
                                        disabled={isLoadingCheck || !classUid.trim()}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                    >
                                        {isLoadingCheck ? (
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                </svg>
                                                Search
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Students List */}
                            {students && (
                                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-semibold text-white flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                            </svg>
                                            Class Students ({students.length})
                                        </h2>
                                        <div className="text-sm text-slate-400">
                                            Attended: {students.filter(s => s.status).length} / {students.length}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        {students.map((student, idx) => (
                                            <div key={idx} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center mr-3">
                                                        <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-white">{student.nim}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    {student.status ? (
                                                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30">
                                                            ✓ Attended
                                                        </span>
                                                    ) : (
                                                        <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full border border-red-500/30">
                                                            ✗ Not Attended
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Create New Class Section */}
                            {notFound && (
                                <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700 border-dashed">
                                    <div className="text-center mb-6">
                                        <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Class Not Found</h3>
                                        <p className="text-slate-400 text-sm">Would you like to create a new class?</p>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="block text-slate-300 text-sm font-medium">
                                            Add Students (NIM)
                                        </label>
                                        {newStudents.map((nim, i) => (
                                            <div key={i} className="flex space-x-2">
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        value={nim}
                                                        onChange={(e) => {
                                                            const copy = [...newStudents];
                                                            copy[i] = e.target.value;
                                                            setNewStudents(copy);

                                                            const errCopy = [...nimErrors];
                                                            errCopy[i] = "";
                                                            setNimErrors(errCopy);
                                                        }}
                                                        placeholder={`Student NIM #${i + 1}`}
                                                        className={`w-full px-4 py-3 bg-slate-800 border ${
                                                            nimErrors[i] ? "border-red-500" : "border-slate-700"
                                                        } rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                                                    />
                                                    {nimErrors[i] && (
                                                        <p className="text-red-400 text-sm mt-1">{nimErrors[i]}</p>
                                                    )}
                                                </div>
                                                {newStudents.length > 1 && (
                                                    <button
                                                        onClick={() => removeStudentField(i)}
                                                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-xl transition-all"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        <button
                                            onClick={addStudentField}
                                            className="text-blue-400 hover:text-blue-300 text-sm flex items-center transition-colors"
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                            Add another student
                                        </button>

                                        <button
                                            onClick={handleCreateClass}
                                            disabled={isLoadingCreate}
                                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                        >
                                            {isLoadingCreate ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Creating Class...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                                    </svg>
                                                    Create Class
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

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

                            {/* Success Message */}
                            {success && (
                                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <p className="text-green-400 text-sm">{success}</p>
                                    </div>
                                </div>
                            )}

                            {/* New Class UID Display */}
                            {newClassUid && (
                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-blue-400 text-sm font-medium mb-1">New Class UID Created:</p>
                                            <p className="text-white font-mono text-lg">{newClassUid}</p>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(newClassUid)}
                                            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-2 rounded-lg transition-all"
                                            title="Copy to clipboard"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}