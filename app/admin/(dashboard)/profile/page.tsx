"use client";

import { useState } from "react";
import API from "@/lib/api";

export default function ProfilePage() {
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // 🔥 HANDLE CHANGE PASSWORD
  const handleChangePassword = async () => {
    if (form.new_password !== form.confirm_password) {
      return setMessage("Passwords do not match");
    }

    try {
      await API.post("/admin/change-password", form);
      setMessage("Password updated successfully");
      setForm({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (err: any) {
      setMessage(err?.response?.data?.error || "Error updating password");
    }
  };

  // 🔥 HANDLE FORGOT PASSWORD
  const handleForgotPassword = async () => {
    try {
      await API.post("/admin/forgot-password", { email });
      setMessage("Reset link sent to email");
      setEmail("");
    } catch (err: any) {
      setMessage(err?.response?.data?.error || "Error sending email");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">Admin Profile</h1>

      {message && (
        <div className="mb-4 p-3 bg-blue-50 text-blue-600 rounded">
          {message}
        </div>
      )}

      {/* 🔐 CHANGE PASSWORD */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-4">Change Password</h2>

        <input
          type="password"
          placeholder="Old Password"
          value={form.old_password}
          onChange={(e) =>
            setForm({ ...form, old_password: e.target.value })
          }
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="New Password"
          value={form.new_password}
          onChange={(e) =>
            setForm({ ...form, new_password: e.target.value })
          }
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={form.confirm_password}
          onChange={(e) =>
            setForm({ ...form, confirm_password: e.target.value })
          }
          className="w-full mb-3 p-2 border rounded"
        />

        <button
          onClick={handleChangePassword}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Password
        </button>
      </div>

      {/* 📧 FORGOT PASSWORD
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <button
          onClick={handleForgotPassword}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Send Reset Link
        </button>
      </div> */}
    </div>
  );
}