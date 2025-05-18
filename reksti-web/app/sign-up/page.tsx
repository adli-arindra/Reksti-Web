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
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const router = useRouter();

    // Start the webcam when modal is open
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
            alert("Signed up successfully");
            router.push("/sign-in");
        } else {
            setError("Sign up failed");
        }
        } catch {
        setError("Photo is not clear, pick a better lighting and face the camera!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 text-gray-800">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow border-2 border-gray-800">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
            </Link>
            <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

            <label className="block text-sm font-medium mb-1">NIM</label>
            <input
            type="text"
            value={inputNim}
            onChange={(e) => setInputNim(e.target.value)}
            placeholder="Enter your NIM"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />

            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />

            <button
            onClick={() => setShowCamera(true)}
            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition mb-4"
            >
            {photoBase64 ? "Retake Photo" : "Take Photo"}
            </button>

            {photoBase64 && (
            <img src={photoBase64} alt="Captured" className="w-full rounded mb-4" />
            )}

            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

            <button
            onClick={handleSignUp}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
            Sign Up
            </button>

            <div className="mt-6 text-center text-sm">
            Already have an account?
            <button
                onClick={() => router.push("/sign-in")}
                className="ml-2 text-blue-600 hover:underline"
            >
                Sign In
            </button>
            </div>
        </div>

        {/* Camera Modal */}
        {showCamera && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <video ref={videoRef} className="w-72 h-56 bg-black rounded mb-4" />
                <canvas ref={canvasRef} className="hidden" />
                <div className="flex space-x-4">
                <button
                    onClick={capturePhoto}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Capture
                </button>
                <button
                    onClick={() => setShowCamera(false)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
