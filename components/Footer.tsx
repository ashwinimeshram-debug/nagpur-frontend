"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white mt-10">
        {/* <footer className="bg-[#0f172a] text-white mt-10"> */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">

          {/* Left */}
          <div className="text-sm text-white-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Nagpur Realty Hub. All rights reserved.
          </div>

          {/* Right Links */}
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/about" className="hover:text-orange-400 transition">
              About Us
            </Link>

            <Link href="/contact" className="hover:text-orange-400 transition">
              Contact Us
            </Link>

            <Link href="/privacy-policy" className="hover:text-orange-400 transition">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">

          {/* Terms */}
          <div className="text-xs text-white-500">
            <Link href="/terms" className="hover:text-orange-400">
              Terms of Service
            </Link>
          </div>

          {/* Social Icons (Optional) */}
          <div className="flex gap-4 mt-3 md:mt-0">
            <span className="text-gray-400 text-sm">🌐 Social</span>
          </div>

        </div>
      </div>
    </footer>
  );
}