export default function TermsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-4">
        <strong>Effective Date:</strong> [Insert Date]
      </p>

      <p className="mb-6">
        Welcome to <strong>Nagpur Realty Hub</strong>. By accessing or using our
        website, you agree to comply with and be bound by the following Terms &
        Conditions.
      </p>

      {/* Section 1 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        1. Acceptance of Terms
      </h2>
      <p className="mb-4">
        By using this platform, you confirm that you have read, understood, and
        agreed to these Terms. If you do not agree, please do not use the website.
      </p>

      {/* Section 2 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        2. Nature of Service
      </h2>
      <p className="mb-4">
        Nagpur Realty Hub is an online real estate platform that:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Publishes property listings</li>
        <li>Connects buyers, sellers, and real estate agents</li>
      </ul>
      <p className="mb-4">
        We act only as an <strong>intermediary platform</strong> and do not
        participate in property transactions.
      </p>

      {/* Section 3 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        3. No Verification Guarantee
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Listings are submitted by third parties</li>
        <li>We do not guarantee accuracy or authenticity</li>
        <li>Users must independently verify property details</li>
      </ul>

      {/* Section 4 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        4. User Responsibilities
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Provide accurate information</li>
        <li>Do not post false or illegal content</li>
        <li>Do not misuse or hack the platform</li>
        <li>No offensive or prohibited content</li>
      </ul>

      {/* Section 5 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        5. Property Transactions
      </h2>
      <p className="mb-4">
        Nagpur Realty Hub is not a party to any transaction between users. All
        dealings happen directly between buyer and seller. We are not responsible
        for disputes or losses.
      </p>

      {/* Section 6 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        6. Intellectual Property
      </h2>
      <p className="mb-4">
        All content (logo, design, text, graphics) belongs to Nagpur Realty Hub.
        Unauthorized use is strictly prohibited.
      </p>

      {/* Section 7 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        7. Limitation of Liability
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Property disputes</li>
        <li>Financial losses</li>
        <li>Misrepresentation by users or agents</li>
      </ul>
      <p className="mb-4">Use the platform at your own risk.</p>

      {/* Section 8 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        8. Account Suspension & Content Removal
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Remove listings without notice</li>
        <li>Suspend or terminate accounts</li>
        <li>Take action on violations</li>
      </ul>

      {/* Section 9 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        9. Compliance with Indian Laws
      </h2>
      <p className="mb-4">
        These Terms are governed by the Information Technology Act, 2000 and
        applicable laws of India. Jurisdiction: Nagpur, Maharashtra.
      </p>

      {/* Section 10 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        10. RERA Disclaimer
      </h2>
      <p className="mb-4">
        Nagpur Realty Hub does not guarantee that all listed properties are
        registered under the Real Estate (Regulation and Development) Act, 2016
        (RERA). Users must verify RERA details independently.
      </p>

      {/* Section 11 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        11. Modifications to Terms
      </h2>
      <p className="mb-4">
        We may update these Terms at any time. Continued use means acceptance of
        updated terms.
      </p>

      {/* Section 12 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        12. Contact Information
      </h2>

      <p className="font-medium">Nagpur Realty Hub</p>
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