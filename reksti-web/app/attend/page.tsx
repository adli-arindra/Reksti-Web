"use client";
import Link from "next/link";
import { useRef, useState } from "react";

export default function AttendPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [photo, setPhoto] = useState<string>("");
    const [classUid, setClassUid] = useState("");
    const [error, setError] = useState("");
    const [showCamera, setShowCamera] = useState(false);

    const openCamera = async () => {
        setError("");
        setShowCamera(true);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
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
        openCamera();
    };

    const handleSubmit = async () => {
        if (!classUid.trim() || !photo) {
        setError("Both class UID and photo are required");
        return;
        }

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
            alert("Attendance submitted successfully!");
        } else {
            setError(data.detail || "Submission failed");
        }
        } catch {
        setError("Unable to connect to server");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 text-gray-800">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow space-y-4 relative">
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
            <h1 className="text-2xl font-bold text-center">Attend Class</h1>

            {photo ? (
            <img src={photo} alt="Captured" className="w-full rounded" />
            ) : (
            <button
                onClick={openCamera}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                Open Camera
            </button>
            )}

            {photo && (
            <button
                onClick={retake}
                className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
            >
                Retake Photo
            </button>
            )}

            <input
            type="text"
            placeholder="Enter Class UID"
            value={classUid}
            onChange={(e) => setClassUid(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
            Submit Attendance
            </button>

            {/* Hidden camera modal */}
            {showCamera && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded shadow space-y-4">
                <video ref={videoRef} className="w-full rounded" autoPlay />
                <button
                    onClick={takePhoto}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Capture
                </button>
                <button
                    onClick={() => {
                    stopCamera();
                    setShowCamera(false);
                    }}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                    Cancel
                </button>
                </div>
            </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
        </div>
        </div>
    );
}
