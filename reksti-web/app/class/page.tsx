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

    console.log(students);

    const handleCheckClass = async () => {
        setError("");
        setSuccess("");
        setStudents(null);
        setNotFound(false);

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
            setError("Unable to connect to server");
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
        const filtered = newStudents.map((s) => s.trim());
        if (filtered.length === 0 || filtered.every((s) => !s)) {
        setError("Add at least one student NIM");
        return;
        }

        const allValid = await validateNims(filtered);
        if (!allValid) {
        setError("Some NIMs are invalid");
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
            setSuccess(`Class created: ${data.class_uid}`);
            setNewClassUid(data.class_uid);
            setNotFound(false);
            setError("");
        } else {
            setError("Failed to create class");
        }
        } catch {
        setError("Unable to connect to server");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 text-gray-800">
        <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow space-y-6">
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
            <h1 className="text-2xl font-bold text-center">Class Info</h1>

            <div>
            <label className="block text-sm font-medium mb-1">Class UID</label>
            <input
                type="text"
                value={classUid}
                onChange={(e) => setClassUid(e.target.value)}
                placeholder="Enter class UID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
                onClick={handleCheckClass}
                className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                Check Class
            </button>
            </div>

            {students && (
            <div>
                <h2 className="text-lg font-semibold mb-2">Students in Class:</h2>
                <ul className="list-disc list-inside space-y-1">
                {students.map((s, idx) => (
                    <li key={idx}>
                        <span className="font-medium">{s.nim}</span> — <span className="italic text-sm">{s.status ? "Attended" : "Not Attended"}</span>
                    </li>
                ))}

                </ul>
            </div>
            )}

            {notFound && (
            <div className="border-t pt-4">
                <h2 className="text-lg font-semibold mb-2">Create New Class</h2>
                {newStudents.map((nim, i) => (
                <div key={i} className="mb-2">
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
                    className={`w-full px-3 py-2 border ${
                        nimErrors[i] ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    />
                    {nimErrors[i] && (
                    <p className="text-sm text-red-600">{nimErrors[i]}</p>
                    )}
                </div>
                ))}
                <button
                onClick={() => {
                    setNewStudents([...newStudents, ""]);
                    setNimErrors([...nimErrors, ""]);
                }}
                className="text-blue-600 text-sm mb-2 hover:underline"
                >
                + Add another student
                </button>

                <button
                onClick={handleCreateClass}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                Create Class
                </button>
            </div>
            )}

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
            {newClassUid && (
            <p className="text-sm text-gray-700">
                Save this UID: <strong>{newClassUid}</strong>
            </p>
            )}
        </div>
        </div>
    );
}
