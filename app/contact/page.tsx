"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   alert("Form submitted (connect backend API here)");
  // };

  const handleSubmit = async (e: any) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Message sent successfully ✅");
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      alert(data.error || "Something went wrong");
    }
  } catch (error) {
    alert("Server error");
  }
  };

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
            Have questions or need help with a property? Reach out to us — we’re here to help.
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
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold mb-2">
            Send a Message
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            required
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            required
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
          >
            Submit
          </button>

          <p className="text-xs text-gray-500 mt-2">
            By submitting, you agree to our Terms & Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
}