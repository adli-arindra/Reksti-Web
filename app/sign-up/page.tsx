"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
    const [inputNim, setInputNim] = useState("");
    const [fullName, setFullName] = useState("");
    const [photoBase64, setPhotoBase64] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [showCamera, setShowCamera] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (showCamera) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play();
                    }
                })
                .catch(() => setError("Could not access the camera"));
        } else {
            // Stop the webcam stream when modal closes
            if (videoRef.current?.srcObject) {
                (videoRef.current.srcObject as MediaStream)
                    .getTracks()
                    .forEach(track => track.stop());
            }
        }
    }, [showCamera]);

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(video, 0, 0);
                const base64 = canvas.toDataURL("image/png");
                setPhotoBase64(base64);
                setShowCamera(false);
            }
        }
    };

    const handleSignUp = async () => {
        if (!inputNim.trim() || !fullName.trim() || !photoBase64) {
            setError("All fields including photo are required");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + "/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ NIM: inputNim, nama_lengkap: fullName, foto_wajah: photoBase64 }),
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                // Success feedback
                router.push("/sign-in?success=registered");
            } else {
                setError(data.message || "Sign up failed");
            }
        } catch {
            setError("Photo is not clear, pick a better lighting and face the camera!");
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
                            <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                            <p className="text-slate-400">Join AttendanceX with facial recognition</p>
                        </div>

                        {/* Form */}
                        <div className="space-y-6">
                            {/* NIM Input */}
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">
                                    Student ID (NIM)
                                </label>
                                <input
                                    type="text"
                                    value={inputNim}
                                    onChange={(e) => setInputNim(e.target.value)}
                                    placeholder="Enter your NIM"
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Full Name Input */}
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Photo Section */}
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">
                                    Profile Photo
                                </label>

                                {photoBase64 ? (
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <img
                                                src={photoBase64}
                                                alt="Captured"
                                                className="w-full h-48 object-cover rounded-xl border border-slate-700"
                                            />
                                            <div className="absolute top-2 right-2">
                                                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                                    ✓ Photo captured
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setShowCamera(true)}
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
                                        onClick={() => setShowCamera(true)}
                                        className="w-full bg-slate-800 border border-slate-700 hover:border-slate-600 text-white py-12 rounded-xl transition-all flex flex-col items-center justify-center space-y-2"
                                    >
                                        <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        <span className="text-slate-300 font-medium">Take Photo</span>
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
                                onClick={handleSignUp}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>

                            {/* Sign In Link */}
                            <div className="text-center">
                                <p className="text-slate-400 text-sm">
                                    Already have an account?{' '}
                                    <button
                                        onClick={() => router.push("/sign-in")}
                                        className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                                    >
                                        Sign In
                                    </button>
                                </p>
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
                            <h3 className="text-xl font-semibold text-white mb-2">Take Your Photo</h3>
                            <p className="text-slate-400 text-sm">Position your face in the center and ensure good lighting</p>
                        </div>

                        <video
                            ref={videoRef}
                            className="w-full h-64 bg-black rounded-xl mb-4 object-cover"
                            autoPlay
                        />
                        <canvas ref={canvasRef} className="hidden" />

                        <div className="flex space-x-3">
                            <button
                                onClick={capturePhoto}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                Capture
                            </button>
                            <button
                                onClick={() => setShowCamera(false)}
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