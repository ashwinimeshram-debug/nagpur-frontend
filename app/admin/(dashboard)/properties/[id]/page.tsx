"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "@/lib/api";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

export default function PropertyDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [property, setProperty] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [nav, setNav] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const [contact, setContact] = useState(null);
  const [loadingContact, setLoadingContact] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        await fetchProperty();
        await fetchNav();
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  // 🔥 FETCH PROPERTY
  const fetchProperty = async () => {
    try {
      const res = await API.get(`/admin/property/${id}`);
      setProperty(res.data);
      setForm(res.data);
    } catch (err: any) {
      console.error("Property fetch error:", err);

      if (err?.response?.status === 401) {
        router.replace("/admin"); // ✅ FIXED
      }
    }
  };

  // Fetch Contact Details
  const fetchContactDetails = async () => {
  try {
    setLoadingContact(true);

    const res = await API.get(`/admin/property/${id}/contacts`);

    setContact(res.data.contacts[0] || null);

  } catch (err) {
    console.error("Contact fetch error:", err);
  } finally {
    setLoadingContact(false);
  }
  };


  // Delete Property
  const handleDelete = async () => {
  try {
    await API.delete(`/admin/property/${id}`);

    alert("Property deleted successfully");

    setShowDeleteModal(false);
    router.push("/admin/properties");

  } catch (err) {
    console.error("Delete error:", err);
  }
  };

  // 🔥 FETCH NAVIGATION
  const fetchNav = async () => {
    try {
      const res = await API.get(`/admin/property-nav/${id}`);
      setNav(res.data);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        router.replace("/admin"); // ✅ FIXED
      }
    }
  };

  // 🔥 INPUT CHANGE
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 SAVE
  const handleSave = async () => {
    try {
      await API.put(`/admin/property/${id}`, form);
      alert("Saved successfully");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        router.replace("/admin");
      }
    }
  };

  // 🔥 ACTIONS (approve/reject etc.)
  const handleAction = async (action: string) => {
    try {
      await API.post(`/admin/${action}/${id}`);
      fetchProperty();
    } catch (err: any) {
      if (err?.response?.status === 401) {
        router.replace("/admin");
      }
    }
  };

  // 🔥 LOADING GUARD (NO FLICKER)
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!property) {
    return <div className="p-6 text-red-500">Property not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{form.title}</h1>

        <div className="flex gap-2">
          {nav?.prev_id && (
            <button
              onClick={() => router.push(`/admin/properties/${nav.prev_id}`)}
              className="bg-gray-300 px-3 py-2 rounded"
            >
              ⬅ Prev
            </button>
          )}

          {nav?.next_id && (
            <button
              onClick={() => router.push(`/admin/properties/${nav.next_id}`)}
              className="bg-gray-300 px-3 py-2 rounded"
            >
              Next ➡
            </button>
          )}

          <button
            onClick={() => router.push("/admin/dashboard")}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Back
          </button>
        </div>
      </div>

      {/* IMAGE UPLOAD */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-3">Images</h2>

        <input
          type="file"
          multiple
          onChange={async (e) => {
            const files = e.target.files;
            if (!files) return;

            const formData = new FormData();

            for (let i = 0; i < files.length; i++) {
              formData.append("images", files[i]);
            }

            try {
              await API.post(`/admin/upload-images/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

              fetchProperty();
            } catch (err: any) {
              if (err?.response?.status === 401) {
                router.replace("/admin");
              }
            }
          }}
          className="mb-4"
        />

        {/* IMAGE GRID */}
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={async (event) => {
            const { active, over } = event;
            if (!over || active.id === over.id) return;

            const oldIndex = property.images.findIndex(
              (img: any) => img.id === active.id
            );

            const newIndex = property.images.findIndex(
              (img: any) => img.id === over.id
            );

            const newItems = arrayMove(property.images, oldIndex, newIndex);

            setProperty({ ...property, images: newItems });

            const payload = newItems.map((img: any, index: number) => ({
              id: img.id,
              order: index + 1,
            }));

            await API.post("/admin/reorder-images", payload);
          }}
        >
          <SortableContext
            items={property.images.map((img: any) => img.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-4 gap-3">
              {property.images.map((img: any) => (
                <div key={img.id} className="relative cursor-move">

                  <img
                    src={`http://localhost:5000/${img.url}`}
                    className="w-full h-32 object-cover rounded"
                  />

                  <button
                    onClick={async () => {
                      try {
                        await API.delete(`/admin/delete-image/${img.id}`);
                        fetchProperty();
                      } catch (err: any) {
                        if (err?.response?.status === 401) {
                          router.replace("/admin");
                        }
                      }
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded"
                  >
                    ✕
                  </button>

                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* USER INFO
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-3">User Details</h2>

        <p><strong>Name:</strong> {property.user?.name || "-"}</p>
        <p><strong>Email:</strong> {property.user?.email || "-"}</p>
        <p><strong>Phone:</strong> {property.user?.phone || "-"}</p>
      </div> */}

      {/* USER INFO */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">

        {/* 🔝 Header + Button */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">User Details</h2>

          <button
            onClick={fetchContactDetails}
            className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
          >
            {loadingContact ? "Loading..." : "Fetch Details"}
          </button>
        </div>

        {/* 👇 Contact Data */}
        <p><strong>Name:</strong> {contact?.name || "-"}</p>
        <p><strong>Email:</strong> {contact?.email || "-"}</p>
        <p><strong>Phone:</strong> {contact?.mobile || "-"}</p>

      </div>

      {/* FORM
      <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">

        <input name="title" value={form.title || ""} onChange={handleChange} className="border p-2 rounded" />
        <input name="price" value={form.price || ""} onChange={handleChange} className="border p-2 rounded" />

        <input name="location" value={form.location || ""} onChange={handleChange} className="border p-2 rounded" />
        <input name="city" value={form.city || ""} onChange={handleChange} className="border p-2 rounded" />

        <input name="state" value={form.state || ""} onChange={handleChange} className="border p-2 rounded" />
        <input name="pincode" value={form.pincode || ""} onChange={handleChange} className="border p-2 rounded" />

        <input name="bedrooms" value={form.bedrooms || ""} onChange={handleChange} className="border p-2 rounded" />
        <input name="bathrooms" value={form.bathrooms || ""} onChange={handleChange} className="border p-2 rounded" />

        <input name="area" value={form.area || ""} onChange={handleChange} className="border p-2 rounded" />

        <textarea name="description" value={form.description || ""} onChange={handleChange} className="border p-2 rounded col-span-2" />
      </div> */}

      {/* FORM */}
      <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">

        <input
          name="title"
          placeholder="Enter property title"
          value={form.title || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="price"
          placeholder="Enter price (₹)"
          value={form.price || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="location"
          placeholder="Enter location (area/locality)"
          value={form.location || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {/* <input
          name="city"
          placeholder="Enter city"
          value={form.city || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="state"
          placeholder="Enter state"
          value={form.state || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="pincode"
          placeholder="Enter pincode"
          value={form.pincode || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="bedrooms"
          placeholder="Number of bedrooms"
          value={form.bedrooms || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="bathrooms"
          placeholder="Number of bathrooms"
          value={form.bathrooms || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="area"
          placeholder="Area in sq.ft"
          value={form.area || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        /> */}

        <textarea
          name="description"
          placeholder="Enter detailed property description..."
          value={form.description || ""}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />

      </div>

      {/* SAVE */}
      <button onClick={handleSave} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
        Save Changes
      </button>

      {/* ACTIONS */}
      <div className="mt-6 space-x-3">
        <button onClick={() => handleAction("approve")} className="bg-green-500 text-white px-4 py-2 rounded">Approve</button>
        <button onClick={() => handleAction("reject")} className="bg-red-500 text-white px-4 py-2 rounded">Reject</button>

        {property.is_closed ? (
          <button onClick={() => handleAction("reopen")} className="bg-blue-500 text-white px-4 py-2 rounded">Reopen</button>
        ) : (
          <button onClick={() => handleAction("close")} className="bg-gray-700 text-white px-4 py-2 rounded">Close</button>
        )}

      </div>

        {property.is_closed && (
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded mt-4"
          >
            Delete Property
          </button>
        )}

        {/* ✅ ✅ ADD MODAL HERE (VERY BOTTOM) */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            
            <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
              <h2 className="text-lg font-semibold mb-3">Confirm Delete</h2>

              <p className="text-gray-600 mb-5">
                Are you sure you want to delete this property? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>

          </div>
        )}

    </div>
  );
}