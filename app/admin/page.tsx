"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminLogin() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 NEW STATES
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sending, setSending] = useState(false);


  const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
  };

  // 🔥 Redirect if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(
          "http://localhost:5000/api/admin/check-auth",
          { withCredentials: true }
        );

        router.replace("/admin/dashboard");
      } catch {}
    };

    checkAuth();
  }, [router]);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:5000/api/admin/login",
        form,
        { withCredentials: true }
      );

      router.replace("/admin/dashboard");

    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FORGOT PASSWORD FUNCTION
  const handleForgotPassword = async () => {
    setMessage("");
    setSending(true);

    try {
      await axios.post(
        "http://localhost:5000/api/admin/forgot-password",
        { email }
      );

      setMessage("✅ Reset link sent! Check your email");
      setEmail("");
    } catch (err: any) {
      setMessage(
        err?.response?.data?.error || "Error sending reset link"
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

        <h1 className="text-2xl font-bold text-center text-blue-600 mb-2">
          Nagpur Realty Hub
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Admin Login
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-500 text-center bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        {/* 🔐 LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="text-sm text-gray-600">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* 🔥 FORGOT PASSWORD BUTTON */}
          {/* <div className="text-right">
            <button
              type="button"
              onClick={() => setShowForgot(!showForgot)}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div> */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white ${
              loading
                ? "bg-blue-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* 🔥 FORGOT PASSWORD BOX */}
        {showForgot && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">

            <h3 className="text-sm font-semibold mb-2">
              Reset Password
            </h3>

            {/* {message && (
              <div className="text-xs mb-2 text-blue-600">
                {message}
              </div>
            )} */}
            {message && (
              <div className="mb-3 text-sm text-green-600 bg-green-50 p-2 rounded text-center">
                {message}
              </div>
            )}

            <input
              type="email"
              placeholder="Enter registered email"
              value={email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);

                if (!validateEmail(value)) {
                  setEmailError("Enter a valid email");
                } else {
                  setEmailError("");
                }
              }}
              className="w-full mb-2 px-3 py-2 border rounded"
            />
            {/* Show Error */}
            {emailError && (
              <p className="text-xs text-red-500 mb-2">
                {emailError}
              </p>
            )}


            {/* <button
              onClick={handleForgotPassword}
              className="w-full bg-gray-800 text-white py-2 rounded text-sm"
            >
              Send Reset Link
            </button> */}
            <button
              onClick={handleForgotPassword}
              disabled={sending || !email || emailError}
              className={`w-full py-2 rounded text-sm text-white ${
                sending || !email || emailError
                  ? "bg-gray-400"
                  : "bg-gray-800 hover:bg-gray-900"
              }`}
            >
              {sending ? "Sending..." : "Send Reset Link"}
            </button>

          </div>
        )}

      </div>
    </div>
  );
}