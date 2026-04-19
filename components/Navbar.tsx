export default function Navbar() {
  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">
        Nagpur Realty Hub
      </h1>

      <div className="space-x-6">
        <a href="/" className="hover:text-blue-500">Home</a>
        <a href="/properties" className="hover:text-blue-500">Properties</a>
        {/* <a href="/post" className="hover:text-blue-500">Post Property</a> */}
        <a href="/admin" className="bg-blue-500 text-white px-4 py-2 rounded">
          Admin
        </a>
      </div>
    </div>
  );
}