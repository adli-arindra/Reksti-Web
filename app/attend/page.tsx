"use client";
import Link from "next/link";
import { useRef, useState } from "react";

export default function AttendPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [photo, setPhoto] = useState<string>("");
    const [classUid, setClassUid] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showCamera, setShowCamera] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const openCamera = async () => {
        setError("");
        try {
            setShowCamera(true);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (err) {
            setError("Could not access camera. Please check permissions.");
            setShowCamera(false);
        }
    };

    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const context = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context?.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL("image/png");
            setPhoto(dataUrl);
            stopCamera();
            setShowCamera(false);
        }
    };

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject as MediaStream;
        stream?.getTracks().forEach((track) => track.stop());
    };

    const retake = () => {
        setPhoto("");
        setError("");
        setSuccessMessage("");
        openCamera();
    };

    const handleSubmit = async () => {
        if (!classUid.trim() || !photo) {
            setError("Both class UID and photo are required");
            return;
        }

        setIsLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + "/attend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    class_uid: classUid,
                    foto_wajah: photo,
                }),
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                setSuccessMessage("Attendance submitted successfully! 🎉");
                // Reset form after success
                setTimeout(() => {
                    setPhoto("");
                    setClassUid("");
                    setSuccessMessage("");
                }, 3000);
            } else {
                setError(data.detail || "Submission failed. Please try again.");
            }
        } catch {
            setError("Unable to connect to server. Please check your connection.");
        } finally {
            setIsLoading(false);
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
            <div className="flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-yellow-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Mark Attendance</h1>
                            <p className="text-slate-400">Take a photo to verify your presence</p>
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
                            {/* Class UID Input */}
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">
                                    Class UID
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter Class UID"
                                        value={classUid}
                                        onChange={(e) => setClassUid(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all pl-12"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Photo Section */}
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">
                                    Verification Photo
                                </label>

                                {photo ? (
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <img
                                                src={photo}
                                                alt="Captured"
                                                className="w-full h-64 object-cover rounded-xl border border-slate-700"
                                            />
                                            <div className="absolute top-2 right-2">
                                                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                                    ✓ Photo captured
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={retake}
                                            className="w-full bg-slate-800 border border-slate-700 hover:border-slate-600 text-white py-3 rounded-xl transition-all flex items-center justify-center"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                            </svg>
                                            Retake Photo
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={openCamera}
                                        className="w-full bg-slate-800 border border-slate-700 hover:border-slate-600 text-white py-12 rounded-xl transition-all flex flex-col items-center justify-center space-y-2 group"
                                    >
                                        <svg className="w-12 h-12 text-slate-400 group-hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        <span className="text-slate-300 font-medium">Take Attendance Photo</span>
                                        <span className="text-slate-500 text-sm">Click to open camera</span>
                                    </button>
                                )}
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
                                onClick={handleSubmit}
                                disabled={isLoading || !photo || !classUid.trim()}
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting Attendance...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        Submit Attendance
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Info Section */}
                        <div className="mt-8 pt-6 border-t border-slate-800">
                            <div className="text-center">
                                <p className="text-slate-500 text-xs mb-2">Attendance Requirements</p>
                                <div className="flex justify-center space-x-4 text-xs">
                                    <span className="text-slate-400">✓ Clear Photo</span>
                                    <span className="text-slate-400">✓ Valid Class UID</span>
                                    <span className="text-slate-400">✓ Face Visible</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Camera Modal */}
            {showCamera && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full">
                        <div className="text-center mb-4">
                            <h3 className="text-xl font-semibold text-white mb-2">Take Attendance Photo</h3>
                            <p className="text-slate-400 text-sm">Position your face clearly in the frame</p>
                        </div>

                        <video
                            ref={videoRef}
                            className="w-full h-64 bg-black rounded-xl mb-4 object-cover"
                            autoPlay
                        />
                        <canvas ref={canvasRef} className="hidden" />

                        <div className="flex space-x-3">
                            <button
                                onClick={takePhoto}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                Capture
                            </button>
                            <button
                                onClick={() => {
                                    stopCamera();
                                    setShowCamera(false);
                                }}
                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-medium transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}