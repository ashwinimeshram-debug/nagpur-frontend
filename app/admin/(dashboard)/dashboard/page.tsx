"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

export default function Dashboard() {
  const router = useRouter();

  const [properties, setProperties] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [properties, search, filter, sortKey, sortOrder]);

  const fetchProperties = async () => {
    try {
      const res = await API.get("/admin/properties");
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to fetch properties:", err);

      // Session expired or unauthorized
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: number, action: string) => {
    try {
      await API.post(`/admin/${action}/${id}`);
      fetchProperties();
    } catch (err) {
      console.error(err);
    }
  };

  const applyFilters = () => {
    let data = [...properties];

    // Search
    if (search.trim()) {
      data = data.filter((property: any) =>
        property.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status Filter
    switch (filter) {
      case "approved":
        data = data.filter(
          (property: any) => property.status === "approved"
        );
        break;

      case "pending":
        data = data.filter(
          (property: any) => property.status === "pending"
        );
        break;

      case "rejected":
        data = data.filter(
          (property: any) => property.status === "rejected"
        );
        break;

      case "closed":
        data = data.filter(
          (property: any) => property.is_closed
        );
        break;

      default:
        break;
    }

    data.sort((a: any, b: any) => {
      let valueA = a[sortKey];
      let valueB = b[sortKey];

      if (
        sortKey === "is_closed" ||
        sortKey === "is_featured"
      ) {
        valueA = valueA ? 1 : 0;
        valueB = valueB ? 1 : 0;
      }

      if (typeof valueA === "string") {
        valueA = valueA.toLowerCase();
      }

      if (typeof valueB === "string") {
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }

      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }

      return 0;
    });

    setFiltered(data);
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder((previous) =>
        previous === "asc" ? "desc" : "asc"
      );
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedData = filtered.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const total = properties.length;

  const approved = properties.filter(
    (property) => property.status === "approved"
  ).length;

  const pendingCount = properties.filter(
    (property: any) => property.status === "pending"
  ).length;

  const rejected = properties.filter(
    (property) => property.status === "rejected"
  ).length;

  const closed = properties.filter(
    (property) => property.is_closed
  ).length;

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }
    return (
    <div className="p-6">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-5 gap-4 mb-6">

        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-gray-500 text-sm">Total</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>

        <div className="bg-green-100 rounded-xl shadow p-4">
          <p className="text-gray-500 text-sm">Approved</p>
          <h2 className="text-2xl font-bold text-green-700">
            {approved}
          </h2>
        </div>

        <div className="bg-yellow-100 rounded-xl shadow p-4">
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-2xl font-bold text-yellow-700">
            {pendingCount}
          </h2>
        </div>

        <div className="bg-red-100 rounded-xl shadow p-4">
          <p className="text-gray-500 text-sm">Rejected</p>
          <h2 className="text-2xl font-bold text-red-700">
            {rejected}
          </h2>
        </div>

        <div className="bg-gray-200 rounded-xl shadow p-4">
          <p className="text-gray-500 text-sm">Closed</p>
          <h2 className="text-2xl font-bold">
            {closed}
          </h2>
        </div>

      </div>

      {/* Search & Filter */}

      <div className="flex justify-between gap-4 mb-6">

        <input
          type="text"
          placeholder="Search property title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-2 w-1/3"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="closed">Closed</option>
        </select>

      </div>

      {/* Property Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                #
              </th>

              <th
                onClick={() => handleSort("title")}
                className="p-3 text-left cursor-pointer"
              >
                Title ⬍
              </th>

              <th
                onClick={() => handleSort("status")}
                className="p-3 text-left cursor-pointer"
              >
                Status ⬍
              </th>

              <th
                onClick={() => handleSort("is_closed")}
                className="p-3 text-left cursor-pointer"
              >
                Closed ⬍
              </th>

              <th
                onClick={() => handleSort("is_featured")}
                className="p-3 text-left cursor-pointer"
              >
                Featured ⬍
              </th>

              <th className="p-3 text-left">
                User
              </th>

              <th className="p-3 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {paginatedData.map((property, index) => (

              <tr
                key={property.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-3">
                  {startIndex + index + 1}
                </td>

                <td className="p-3">

                  <a
                    href={`/admin/properties/${property.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {property.title}
                  </a>

                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded text-white text-sm ${
                      property.status === "approved"
                        ? "bg-green-500"
                        : property.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {property.status}
                  </span>

                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded text-white text-sm ${
                      property.is_closed
                        ? "bg-gray-600"
                        : "bg-blue-500"
                    }`}
                  >
                    {property.is_closed ? "Closed" : "Open"}
                  </span>

                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      handleAction(property.id, "feature")
                    }
                    className={`w-12 h-6 rounded-full flex items-center p-1 transition ${
                      property.is_featured
                        ? "bg-yellow-400"
                        : "bg-gray-300"
                    }`}
                  >

                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                        property.is_featured
                          ? "translate-x-6"
                          : ""
                      }`}
                    />

                  </button>

                </td>

                <td className="p-3 text-sm text-gray-600">
                  {property.uploader_name || "-"}
                </td>

                <td className="p-3 space-x-2">

                  <button
                    onClick={() =>
                      handleAction(property.id, "approve")
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      handleAction(property.id, "reject")
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>

                  {property.is_closed ? (

                    <button
                      onClick={() =>
                        handleAction(property.id, "reopen")
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Reopen
                    </button>

                  ) : (

                    <button
                      onClick={() =>
                        handleAction(property.id, "close")
                      }
                      className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded"
                    >
                      Close
                    </button>

                  )}

                  <button
                    onClick={async () => {
                      if (!confirm(`Delete "${property.title}"? This will permanently remove the property and all its images.`)) return;
                      try {
                        await API.delete(`/admin/property/${property.id}`);
                        fetchProperties();
                      } catch (err: any) {
                        alert(err.response?.data?.error || "Delete failed. Property must be closed first.");
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
        

      </div>

            {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {Array.from(
          { length: Math.ceil(filtered.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded-md transition ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}
