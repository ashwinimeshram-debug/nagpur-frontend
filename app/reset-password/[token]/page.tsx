"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import API from "@/lib/api";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (password !== confirm) {
      return setMessage("Passwords do not match");
    }

    try {
      await API.post(`/admin/reset-password/${token}`, {
        password,
      });

      setMessage("Password reset successful");

      setTimeout(() => {
        router.push("/admin");
      }, 1500);

    } catch (err: any) {
      setMessage(err?.response?.data?.error || "Invalid or expired link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        {message && (
          <div className="mb-4 text-sm text-blue-600 bg-blue-50 p-2 rounded text-center">
            {message}
          </div>
        )}

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-4 p-2 border rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Reset Password
        </button>

      </div>
    </div>
  );
}