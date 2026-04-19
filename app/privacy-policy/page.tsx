export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        <strong>Effective Date:</strong> [Insert Date]
      </p>

      <p className="mb-6">
        Welcome to <strong>Nagpur Realty Hub</strong> (“Company”, “we”, “our”, “us”).
        We are committed to protecting your privacy and ensuring that your personal
        information is handled in a safe and responsible manner in accordance with
        applicable Indian laws.
      </p>

      {/* Section 1 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        1. Information We Collect
      </h2>

      <h3 className="font-semibold mt-4">a) Personal Information</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>Full Name</li>
        <li>Email Address</li>
        <li>Mobile Number</li>
        <li>Location/City</li>
        <li>Information submitted via forms</li>
      </ul>

      <h3 className="font-semibold mt-4">b) Property Information</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>Property details from owners, builders, or agents</li>
        <li>Images, pricing, and descriptions</li>
      </ul>

      <h3 className="font-semibold mt-4">c) Technical & Usage Data</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>IP Address</li>
        <li>Browser type</li>
        <li>Device information</li>
        <li>Pages visited</li>
        <li>Cookies</li>
      </ul>

      {/* Section 2 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Manage property listings</li>
        <li>Connect buyers, sellers, and agents</li>
        <li>Respond to inquiries</li>
        <li>Improve user experience</li>
        <li>Marketing (with consent)</li>
        <li>Prevent fraud</li>
      </ul>

      {/* Section 3 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        3. Sharing of Information
      </h2>
      <p className="mb-4">
        We do <strong>not sell or rent</strong> your personal information.
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Property owners/agents</li>
        <li>Service providers (hosting, analytics)</li>
        <li>Legal authorities (if required)</li>
      </ul>

      {/* Section 4 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        4. Cookies Policy
      </h2>
      <p className="mb-4">
        We use cookies to enhance user experience, analyze traffic, and remember preferences.
        You can disable cookies in your browser settings.
      </p>

      {/* Section 5 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        5. Data Security
      </h2>
      <p className="mb-4">
        We follow reasonable security practices under the Information Technology Act, 2000.
        However, no system is completely secure.
      </p>

      {/* Section 6 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        6. Your Rights
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Access your data</li>
        <li>Request correction</li>
        <li>Request deletion</li>
        <li>Opt-out of marketing</li>
      </ul>

      <p className="mb-4">
        Contact:{" "}
        <a
          href="mailto:info@nagpurrealtyhub.com"
          className="text-blue-600 underline"
        >
          info@nagpurrealtyhub.com
        </a>
      </p>

      {/* Section 7 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        7. Third-Party Links
      </h2>
      <p className="mb-4">
        We are not responsible for third-party website content or privacy practices.
      </p>

      {/* Section 8 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        8. Children's Privacy
      </h2>
      <p className="mb-4">
        Our services are not intended for individuals under 18 years of age.
      </p>

      {/* Section 9 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        9. Changes to this Policy
      </h2>
      <p className="mb-4">
        We may update this policy from time to time. Changes will be posted here.
      </p>

      {/* Section 10 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        10. Contact Us
      </h2>

      <p className="mb-2 font-medium">Nagpur Realty Hub</p>
      <p>Plot No 101, B Wing, Swami Krupa Recidency</p>
      <p>Near Purti Super Market, Besa Road</p>
      <p>Manish Nagar, Nagpur – 440037, Maharashtra, India</p>

      <p className="mt-2">
        📞 92703330343 <br />
        📧{" "}
        <a
          href="mailto:info@nagpurrealtyhub.com"
          className="text-blue-600 underline"
        >
          info@nagpurrealtyhub.com
        </a>{" "}
        <br />
        🌐{" "}
        <a
          href="https://www.nagpurrealtyhub.com"
          target="_blank"
          className="text-blue-600 underline"
        >
          www.nagpurrealtyhub.com
        </a>
      </p>
    </div>
  );
}