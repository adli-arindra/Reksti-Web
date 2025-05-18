"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/user-context";
import Link from "next/link";

export default function SignInPage() {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { nim, full_name, classes, setUser } = useUser();
    console.log(nim, full_name, classes);

    const handleSignIn = async () => {
        if (!input.trim()) {
        setError("NIM is required");
        return;
        }

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
            alert(`Signed in with NIM: ${input}`);
            setUser({
                nim: input,
                full_name: data.nama,
                classes: data.class_uids
            })
        } else if (res.status === 404) {
            setError("User not found");
        } else {
            setError("Something went wrong");
        }
        } catch (err) {
        setError("Unable to connect to server");
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
            <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

            <label htmlFor="nim" className="block text-sm font-medium mb-1">
            NIM
            </label>
            <input
            id="nim"
            name="nim"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your NIM"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            <button
            onClick={handleSignIn}
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
            Sign In
            </button>

            <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?
            <button
                onClick={() => router.push("/sign-up")}
                className="ml-2 text-blue-600 hover:underline"
            >
                Sign Up
            </button>
            </div>
        </div>
        </div>
    );
}
