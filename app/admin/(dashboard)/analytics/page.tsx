"use client";

import { useState, useEffect } from "react";
import API from "@/lib/api";

interface AnalyticsData {
  total_visits: number;
  unique_visitors: number;
  visits_today: number;
  visits_this_week: number;
  visits_this_month: number;
  top_pages: { page: string; visits: number }[];
  daily_visits: { date: string; visits: number }[];
  total_leads: number;
  leads_this_week: number;
  leads_this_month: number;
  total_contact_us: number;
  contact_us_this_week: number;
  contact_us_this_month: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"week" | "month" | "all">("month");

  useEffect(() => {
    setLoading(true);
    API.get("/admin/analytics")
      .then((r) => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const maxBar = data
    ? Math.max(...data.daily_visits.map((d) => d.visits), 1)
    : 1;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      {loading ? (
        <div className="grid grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-5 animate-pulse h-28" />
          ))}
        </div>
      ) : !data ? (
        <p className="text-gray-500">Failed to load analytics.</p>
      ) : (
        <>
          {/* --- OVERVIEW CARDS --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card label="Total Visits" value={data.total_visits} color="blue" />
            <Card label="Unique Visitors" value={data.unique_visitors} color="purple" />
            <Card label="Visits Today" value={data.visits_today} color="green" />
            <Card label="This Month" value={data.visits_this_month} color="amber" />
          </div>

          {/* --- VISITS CHART --- */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Visits — Last 14 Days</h2>
            <div className="flex items-end gap-1.5" style={{ height: 160 }}>
              {data.daily_visits.map((d) => {
                const h = maxBar > 0 ? (d.visits / maxBar) * 140 : 0;
                return (
                  <div key={d.date} className="flex-1 flex flex-col items-center">
                    <span className="text-xs text-gray-500 mb-1">{d.visits}</span>
                    <div
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: Math.max(h, 2) }}
                    />
                    <span className="text-[10px] text-gray-400 mt-1 rotate-45 origin-top-left whitespace-nowrap">
                      {d.date.slice(5)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- LEADS & CONTACT US --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Leads */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
                Property Leads
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-orange-600">{data.total_leads}</p>
                  <p className="text-sm text-gray-500">All Time</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-600">{data.leads_this_week}</p>
                  <p className="text-sm text-gray-500">This Week</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-600">{data.leads_this_month}</p>
                  <p className="text-sm text-gray-500">This Month</p>
                </div>
              </div>
            </div>

            {/* Contact Us */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-teal-500 inline-block" />
                Contact Us Submissions
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-teal-600">{data.total_contact_us}</p>
                  <p className="text-sm text-gray-500">All Time</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-teal-600">{data.contact_us_this_week}</p>
                  <p className="text-sm text-gray-500">This Week</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-teal-600">{data.contact_us_this_month}</p>
                  <p className="text-sm text-gray-500">This Month</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- TOP PAGES --- */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Top Pages</h2>
            {data.top_pages.length === 0 ? (
              <p className="text-gray-400 text-sm">No page visits recorded yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2 font-medium">#</th>
                    <th className="pb-2 font-medium">Page</th>
                    <th className="pb-2 font-medium text-right">Visits</th>
                    <th className="pb-2 font-medium w-1/3"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.top_pages.map((p, i) => {
                    const pct = data.total_visits > 0 ? (p.visits / data.total_visits) * 100 : 0;
                    return (
                      <tr key={p.page} className="border-b last:border-0">
                        <td className="py-2 text-gray-400">{i + 1}</td>
                        <td className="py-2 font-mono text-gray-700">{p.page}</td>
                        <td className="py-2 text-right font-semibold">{p.visits}</td>
                        <td className="py-2 pl-3">
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className="bg-blue-500 rounded-full h-2"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Card({ label, value, color }: { label: string; value: number; color: string }) {
  const bg: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200",
    purple: "bg-purple-50 border-purple-200",
    green: "bg-green-50 border-green-200",
    amber: "bg-amber-50 border-amber-200",
  };
  const text: Record<string, string> = {
    blue: "text-blue-700",
    purple: "text-purple-700",
    green: "text-green-700",
    amber: "text-amber-700",
  };
  return (
    <div className={`rounded-xl border p-5 ${bg[color] || bg.blue}`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${text[color] || text.blue}`}>{value.toLocaleString()}</p>
    </div>
  );
}
