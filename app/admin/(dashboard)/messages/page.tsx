"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { backendAssetUrl } from "@/lib/api";

type Tab = "leads" | "contactus";

export default function MessagesPage() {
  const [tab, setTab] = useState<Tab>("leads");
  const [contacts, setContacts] = useState<any[]>([]);
  const [contactus, setContactus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [previewProperty, setPreviewProperty] = useState<any>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const fetchContacts = async () => {
    try {
      const res = await API.get("/admin/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchContactus = async () => {
    try {
      const res = await API.get("/admin/contactus");
      setContactus(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    Promise.all([fetchContacts(), fetchContactus()]).finally(() =>
      setLoading(false)
    );
  }, []);

  const handleLeadClick = async (lead: any) => {
    setSelectedLead(lead);
    setPreviewProperty(null);

    if (!lead.property_id) return;

    setLoadingPreview(true);
    try {
      const res = await API.get(`/admin/property/${lead.property_id}`);
      setPreviewProperty(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoadingPreview(false);
  };

  const handleDeleteContactus = async (id: number) => {
    if (!confirm("Delete this message?")) return;
    try {
      await API.delete(`/admin/contactus/${id}`);
      setContactus((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      {/* TABS */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setTab("leads"); setSelectedLead(null); setPreviewProperty(null); }}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            tab === "leads"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Leads ({contacts.length})
        </button>

        <button
          onClick={() => { setTab("contactus"); setSelectedLead(null); setPreviewProperty(null); }}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            tab === "contactus"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Contact Us ({contactus.length})
        </button>
      </div>

      {/* LEADS TAB */}
      {tab === "leads" && (
        <div className="flex gap-6">

          {/* LEFT: LEADS TABLE */}
          <div className={`${selectedLead ? "w-1/2" : "w-full"} bg-white rounded-xl shadow overflow-x-auto transition-all`}>
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Mobile</th>
                  <th className="p-3 text-left">Property</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-400">
                      No leads yet
                    </td>
                  </tr>
                ) : (
                  contacts.map((c, i) => (
                    <tr
                      key={c.id}
                      onClick={() => handleLeadClick(c)}
                      className={`border-t cursor-pointer transition ${
                        selectedLead?.id === c.id
                          ? "bg-blue-50 border-l-2 border-l-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="p-3">{i + 1}</td>
                      <td className="p-3 font-medium">{c.name}</td>
                      <td className="p-3">{c.email || "-"}</td>
                      <td className="p-3">{c.mobile}</td>
                      <td className="p-3 text-blue-600">{c.property_title}</td>
                      <td className="p-3 text-sm text-gray-500">{c.created_at}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* RIGHT: PROPERTY PREVIEW */}
          {selectedLead && (
            <div className="w-1/2">
              <div className="bg-white rounded-xl shadow p-5 sticky top-6">

                {/* LEAD INFO */}
                <div className="mb-4 pb-4 border-b">
                  <h3 className="font-semibold text-lg mb-2">Lead Details</h3>
                  <p className="text-sm"><strong>Name:</strong> {selectedLead.name}</p>
                  <p className="text-sm"><strong>Email:</strong> {selectedLead.email || "-"}</p>
                  <p className="text-sm"><strong>Mobile:</strong> {selectedLead.mobile}</p>
                  <p className="text-sm text-gray-500 mt-1"><strong>Date:</strong> {selectedLead.created_at}</p>
                </div>

                {/* PROPERTY PREVIEW */}
                <h3 className="font-semibold text-lg mb-3">Property Details</h3>

                {loadingPreview ? (
                  <div className="text-gray-400 text-center py-8">Loading property...</div>
                ) : previewProperty ? (
                  <div>
                    {previewProperty.images && previewProperty.images.length > 0 ? (
                      <img
                        src={backendAssetUrl(previewProperty.images[0].url)}
                        className="w-full h-48 object-cover object-top rounded-lg mb-3"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}

                    <h4 className="font-bold text-lg">{previewProperty.title}</h4>
                    <p className="text-blue-600 font-semibold text-lg">₹ {previewProperty.price}</p>
                    <p className="text-gray-500 text-sm mt-1">📍 {previewProperty.location}</p>

                    {previewProperty.description && (
                      <p className="text-gray-600 text-sm mt-3 line-clamp-4">
                        {previewProperty.description}
                      </p>
                    )}

                    <a
                      href={`/property/${previewProperty.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-blue-600 hover:underline text-sm font-medium"
                    >
                      View Full Details →
                    </a>
                  </div>
                ) : (
                  <div className="text-gray-400 text-center py-8">No property data</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CONTACT US MESSAGES */}
      {tab === "contactus" && (
        <div className="space-y-4">
          {contactus.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400">
              No messages yet
            </div>
          ) : (
            contactus.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-xl shadow p-4 flex justify-between items-start"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-sm text-gray-400">{m.email}</span>
                    <span className="text-sm text-gray-400">{m.phone}</span>
                    <span className="text-xs text-gray-400 ml-auto">{m.created_at}</span>
                  </div>
                  <p className="text-gray-700">{m.message}</p>
                </div>

                <button
                  onClick={() => handleDeleteContactus(m.id)}
                  className="ml-4 text-red-500 hover:text-red-700 text-sm shrink-0"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
