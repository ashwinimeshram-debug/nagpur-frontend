"use client";

import { useState } from "react";
import API from "@/lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    if (submitting || submitted) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (submitting || submitted) return;
    setSubmitting(true);

    try {
      const res = await API.post("/contact", form);
      if (res.status === 201) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error: any) {
      alert(error.response?.data?.error || "Server error");
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border p-3 rounded-lg disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed";

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Get in Touch
          </h2>

          <p className="mb-6">
            Have questions or need help with a property? Reach out to us — we're here to help.
          </p>

          <div className="space-y-4">
            <p>
              <strong>Address:</strong><br />
              Plot No 101, B Wing, Swami Krupa Recidency<br />
              Near Purti Super Market, Besa Road<br />
              Manish Nagar, Nagpur – 440037
            </p>

            <p>
              <strong>Phone:</strong><br />
              <a href="tel:92703330343" className="text-blue-600 underline">
                92703330343
              </a>
            </p>

            <p>
              <strong>Email:</strong><br />
              <a
                href="mailto:info@nagpurrealtyhub.com"
                className="text-blue-600 underline"
              >
                info@nagpurrealtyhub.com
              </a>
            </p>

            <p>
              <strong>Website:</strong><br />
              <a
                href="https://www.nagpurrealtyhub.com"
                target="_blank"
                className="text-blue-600 underline"
              >
                www.nagpurrealtyhub.com
              </a>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
          {submitted ? (
            /* SUCCESS STATE */
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-green-600 mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-gray-500 mb-2">
                Thank you for reaching out. We'll get back to you shortly.
              </p>
              <p className="text-xs text-gray-400">
                A confirmation has been sent to your email.
              </p>
            </div>
          ) : (
            /* FORM STATE */
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold mb-2">
                Send a Message
              </h2>

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={handleChange}
                disabled={submitting}
                className={inputClass}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={handleChange}
                disabled={submitting}
                className={`${inputClass} mt-4`}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                required
                value={form.phone}
                onChange={handleChange}
                disabled={submitting}
                className={`${inputClass} mt-4`}
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                required
                value={form.message}
                onChange={handleChange}
                disabled={submitting}
                className={`${inputClass} mt-4`}
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {submitting ? "Sending..." : "Submit"}
              </button>

              <p className="text-xs text-gray-500 mt-2">
                By submitting, you agree to our Terms & Privacy Policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
