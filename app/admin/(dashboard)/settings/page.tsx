"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { backendAssetUrl } from "@/lib/api";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    API.get("/admin/settings")
      .then((res) => setSettings(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url = res.data.url;
      setSettings((prev) => ({ ...prev, site_logo: url }));
      setSaved(false);
    } catch {
      alert("Logo upload failed");
    }
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await API.put("/admin/settings", settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Failed to save settings");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Website Settings</h1>

        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2 rounded-lg text-white transition ${
            saved
              ? "bg-green-500"
              : "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
          }`}
        >
          {saving ? "Saving..." : saved ? "Saved ✓" : "Save Settings"}
        </button>
      </div>

      {/* GENERAL */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">General</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Website Name</label>
          <input
            type="text"
            value={settings.site_name || ""}
            onChange={(e) => handleChange("site_name", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>

          {/* LOGO PREVIEW */}
          <div className="flex items-center gap-4 mb-3">
            <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
              {settings.site_logo ? (
                <img
                  src={backendAssetUrl(settings.site_logo)}
                  alt="Logo Preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-gray-400 text-xs text-center px-1">No Logo</span>
              )}
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2">
                {settings.site_logo ? "Current logo uploaded" : "No logo uploaded yet"}
              </p>
              <label className="inline-block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <span className={`inline-block px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition ${
                  uploading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}>
                  {uploading ? "Uploading..." : "Browse & Upload"}
                </span>
              </label>
            </div>
          </div>

          {/* HIDDEN INPUT FOR URL (manual override) */}
          <input
            type="text"
            value={settings.site_logo || ""}
            onChange={(e) => handleChange("site_logo", e.target.value)}
            placeholder="Or paste logo URL directly"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* COLORS */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Brand Colors</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={settings.primary_color || "#2563eb"}
                onChange={(e) => handleChange("primary_color", e.target.value)}
                className="w-12 h-10 rounded border cursor-pointer"
              />
              <input
                type="text"
                value={settings.primary_color || ""}
                onChange={(e) => handleChange("primary_color", e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={settings.secondary_color || "#1e40af"}
                onChange={(e) => handleChange("secondary_color", e.target.value)}
                className="w-12 h-10 rounded border cursor-pointer"
              />
              <input
                type="text"
                value={settings.secondary_color || ""}
                onChange={(e) => handleChange("secondary_color", e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* COLOR PREVIEW */}
        <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: settings.primary_color || "#2563eb" }}>
          <p className="text-white font-semibold">Primary Color Preview</p>
          <p className="text-white/80 text-sm">This is how your primary color looks</p>
        </div>
      </div>

      {/* SOCIAL LINKS */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>
        <p className="text-sm text-gray-500 mb-4">These will be displayed in the footer. Leave blank to hide.</p>

        <div className="space-y-3">
          {[
            { key: "social_facebook", label: "Facebook", placeholder: "https://facebook.com/..." },
            { key: "social_instagram", label: "Instagram", placeholder: "https://instagram.com/..." },
            { key: "social_twitter", label: "Twitter / X", placeholder: "https://twitter.com/..." },
            { key: "social_youtube", label: "YouTube", placeholder: "https://youtube.com/..." },
            { key: "social_linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/..." },
          ].map((social) => (
            <div key={social.key} className="flex items-center gap-3">
              <label className="w-28 text-sm font-medium text-gray-700 shrink-0">
                {social.label}
              </label>
              <input
                type="url"
                value={settings[social.key] || ""}
                onChange={(e) => handleChange(social.key, e.target.value)}
                placeholder={social.placeholder}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM SAVE */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2.5 rounded-lg text-white font-medium transition ${
            saved
              ? "bg-green-500"
              : "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
          }`}
        >
          {saving ? "Saving..." : saved ? "Saved ✓" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
