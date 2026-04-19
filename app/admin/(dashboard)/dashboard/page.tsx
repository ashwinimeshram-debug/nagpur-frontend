"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [properties, setProperties] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;



  useEffect(() => {
    fetchProperties();
  }, []);

  // useEffect(() => {
  //   applyFilters();
  // }, [search, filter, properties]);

  useEffect(() => {
  applyFilters();
  }, [properties, search, filter, sortKey, sortOrder]);

  const fetchProperties = async () => {
    try {
      const res = await API.get("/admin/properties");
      setProperties(res.data);
    } catch (err) {
      console.error(err);
      router.push("/admin/dashboard");
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

  // 🔍 FILTER LOGIC

  const applyFilters = () => {
  let data = [...properties];

  // 🔍 SEARCH
  if (search) {
    data = data.filter((p: any) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 🎯 FILTER
  if (filter === "approved") {
    data = data.filter((p: any) => p.status === "approved");
  } else if (filter === "pending") {
    data = data.filter((p: any) => p.status === "pending");
  }else if (filter === "rejected") {
    data = data.filter((p: any) => p.status === "rejected");
  } else if (filter === "closed") {
    data = data.filter((p: any) => p.is_closed);
  } 

  // 🔽 SORTING (ADD THIS PART)
  data.sort((a: any, b: any) => {
    let valA = a[sortKey];
    let valB = b[sortKey];

    // handle boolean
    if (sortKey === "is_closed" || sortKey === "is_featured") {
      valA = valA ? 1 : 0;
      valB = valB ? 1 : 0;
    }

    // handle string
    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  setFiltered(data);
  };

  // const applyFilters = () => {
  //   let data = [...properties];

  //   // Search
  //   if (search) {
  //     data = data.filter((p) =>
  //       p.title.toLowerCase().includes(search.toLowerCase())
  //     );
  //   }

  //   // Status filters
  //   if (filter === "approved") {
  //     data = data.filter((p) => p.status === "approved");
  //   } else if (filter === "rejected") {
  //     data = data.filter((p) => p.status === "rejected");
  //   } else if (filter === "closed") {
  //     data = data.filter((p) => p.is_closed);
  //   }

  //   setFiltered(data);
  // };

  // column header sort function
  const handleSort = (key: string) => {
  if (sortKey === key) {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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

  // 📊 Stats
  const total = properties.length;
  const approved = properties.filter(p => p.status === "approved").length;
  const rejected = properties.filter(p => p.status === "rejected").length;
  const closed = properties.filter(p => p.is_closed).length;
  const pendingCount = properties.filter((p: any) => p.status === "pending").length;



  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* 📊 Stats Cards */}
      {/* <div className="grid grid-cols-4 gap-4 mb-6"> */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Total</h3>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Approved</h3>
          <p className="text-2xl font-bold">{approved}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Pending</p>
          <h2 className="text-xl font-bold text-yellow-700">
            {pendingCount}
          </h2>
        </div>

        <div className="bg-red-100 p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Rejected</h3>
          <p className="text-2xl font-bold">{rejected}</p>
        </div>

        <div className="bg-gray-200 p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Closed</h3>
          <p className="text-2xl font-bold">{closed}</p>
        </div>
      </div>

      {/* 🔍 SEARCH + FILTER */}
      <div className="flex justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* 📋 Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          {/* <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Closed</th>
              <th className="p-3">Featured</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead> */}
          <thead className="bg-gray-100 text-left">
            <tr>

              <th onClick={() => handleSort("id")} className="p-3 cursor-pointer">
                ID ⬍
              </th>

              <th onClick={() => handleSort("title")} className="p-3 cursor-pointer">
                Title ⬍
              </th>

              <th onClick={() => handleSort("status")} className="p-3 cursor-pointer">
                Status ⬍
              </th>

              <th onClick={() => handleSort("is_closed")} className="p-3 cursor-pointer">
                Closed ⬍
              </th>

              <th onClick={() => handleSort("is_featured")} className="p-3 cursor-pointer">
                Featured ⬍
              </th>

              <th className="p-3">Actions</th>

            </tr>
          </thead>

          <tbody>
            {/* {filtered.map((p) => ( */}
            {paginatedData.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                
                <td className="p-3">{p.id}</td>

                <td className="p-3">
                  <a
                    href={`/admin/properties/${p.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {p.title}
                  </a>
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-white text-sm ${
                      p.status === "approved"
                        ? "bg-green-500"
                        : p.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-white text-sm ${
                      p.is_closed ? "bg-gray-600" : "bg-blue-500"
                    }`}
                  >
                    {p.is_closed ? "Closed" : "Open"}
                  </span>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => handleAction(p.id, "feature")}
                    className={`w-12 h-6 flex items-center rounded-full p-1 ${
                      p.is_featured ? "bg-yellow-400" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow transform ${
                        p.is_featured ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleAction(p.id, "approve")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleAction(p.id, "reject")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>

                  {p.is_closed ? (
                    <button
                      onClick={() => handleAction(p.id, "reopen")}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Reopen
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction(p.id, "close")}
                      className="bg-gray-700 text-white px-3 py-1 rounded"
                    >
                      Close
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

            <div className="flex justify-center mt-6 gap-2">
              {Array.from(
                { length: Math.ceil(filtered.length / itemsPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>

    </div>
  );
}