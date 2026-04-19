export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>

      <p className="mb-6">
        Welcome to <strong>Nagpur Realty Hub</strong>, your trusted destination
        for buying, selling, and exploring properties in Nagpur.
      </p>

      <p className="mb-6">
        We are dedicated to simplifying real estate by connecting property buyers,
        sellers, and agents on a single, easy-to-use platform. Whether you are
        looking for your dream home, an investment opportunity, or selling your
        property, Nagpur Realty Hub is here to assist you at every step.
      </p>

      {/* Mission */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">Our Mission</h2>
      <p className="mb-6">
        Our mission is to bring transparency, trust, and efficiency to the real
        estate market in Nagpur by providing accurate listings and a seamless
        user experience.
      </p>

      {/* Vision */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">Our Vision</h2>
      <p className="mb-6">
        To become Nagpur’s most reliable and preferred real estate platform,
        empowering users with the right information and tools to make confident
        property decisions.
      </p>

      {/* Why Choose Us */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">Why Choose Us</h2>
      <ul className="list-disc ml-6 mb-6">
        <li>Verified and quality property listings</li>
        <li>User-friendly search and browsing experience</li>
        <li>Direct connection with property owners and agents</li>
        <li>Local expertise in Nagpur real estate market</li>
        <li>Transparent and trustworthy platform</li>
      </ul>

      {/* Services */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">Our Services</h2>
      <ul className="list-disc ml-6 mb-6">
        <li>Property Listings (Buy / Sell / Rent)</li>
        <li>Lead Generation for Agents & Builders</li>
        <li>Property Promotion & Marketing</li>
        <li>Real Estate Consultation</li>
      </ul>

      {/* Closing */}
      <p className="mt-6">
        At <strong>Nagpur Realty Hub</strong>, we believe in building long-term
        relationships based on trust and results.
      </p>
    </div>
  );
}