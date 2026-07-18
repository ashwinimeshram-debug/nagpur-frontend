"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API from "@/lib/api";

const BUILTIN_SECTIONS = [
  { key: "hero", name: "Hero Section", path: "/admin/cms/hero", settingKey: "section_hero_visible" },
  { key: "services", name: "Services", path: "/admin/cms/services", settingKey: "section_services_visible" },
  { key: "advantages", name: "Advantages", path: "/admin/cms/advantages", settingKey: "section_advantages_visible" },
  { key: "testimonials", name: "Testimonials", path: "/admin/cms/testimonials", settingKey: "section_testimonials_visible" },
];

export default function CMSDashboard() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [customSections, setCustomSections] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    API.get("/settings").then((res) => setSettings(res.data)).catch(() => {});
    API.get("/admin/settings").then((res) => setSettings(res.data)).catch(() => {});
  }, []);

  const toggleSection = async (settingKey: string) => {
    const currentValue = settings[settingKey] === "true";
    const newValue = !currentValue;

    const updated = { ...settings, [settingKey]: String(newValue) };
    setSettings(updated);

    try {
      await API.put("/admin/settings", { [settingKey]: String(newValue) });
    } catch {
      setSettings((prev) => ({ ...prev, [settingKey]: String(currentValue) }));
    }
  };

  const handleAddSection = async () => {
    const name = newName.trim();
    if (!name) return;

    setSaving(true);
    const slug = name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
    const settingKey = `section_${slug}_visible`;

    try {
      await API.put("/admin/settings", {
        [settingKey]: "true",
      });
      setSettings((prev) => ({ ...prev, [settingKey]: "true" }));
      setCustomSections((prev) => [...prev, { name, slug, settingKey }]);
      setShowAddModal(false);
      setNewName("");
    } catch {
      alert("Failed to add section");
    }
    setSaving(false);
  };

  const allSections = [
    ...BUILTIN_SECTIONS,
    ...customSections.map((s) => ({
      key: s.slug,
      name: s.name,
      path: `/admin/cms/${s.slug}`,
      settingKey: s.settingKey,
    })),
  ];

  return (
    <div className="p-6">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">CMS Management</h1>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add New Section
        </button>
      </div>

      {/* SECTIONS GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {allSections.map((section) => {
          const isVisible = settings[section.settingKey] === "true";

          return (
            <div
              key={section.key}
              className={`p-6 bg-white shadow rounded flex items-center justify-between transition ${
                isVisible ? "" : "opacity-60"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* CHECKBOX */}
                <button
                  onClick={() => toggleSection(section.settingKey)}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                    isVisible
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {isVisible && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                <div>
                  <h2 className="text-lg font-semibold">{section.name}</h2>
                  <p className="text-sm text-gray-400">
                    {isVisible ? "Visible on homepage" : "Hidden from homepage"}
                  </p>
                </div>
              </div>

              {/* EDIT LINK (only for built-in sections with dedicated pages) */}
              {section.path && (
                <Link
                  href={section.path}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Edit Content →
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* ADD SECTION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4">Add New Section</h3>

            <input
              type="text"
              placeholder="Section name (e.g. Testimonials)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              onKeyDown={(e) => e.key === "Enter" && handleAddSection()}
              autoFocus
            />

            <p className="text-xs text-gray-400 mb-4">
              This will add a toggle to show/hide this section on the homepage.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSection}
                disabled={saving || !newName.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {saving ? "Adding..." : "Add Section"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
