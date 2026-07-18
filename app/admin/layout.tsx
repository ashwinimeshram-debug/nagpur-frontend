"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import API from "@/lib/api";
import AdminTopbar from "@/components/admin/AdminTopbar";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin";

  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(!isLoginPage);

  useEffect(() => {
    if (isLoginPage) {
      setAuthorized(true);
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        await API.get("/admin/check-auth");
        setAuthorized(true);
      } catch {
        await API.post("/admin/logout").catch(() => {});
        router.replace("/admin");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isLoginPage, router]);

  // Track page visits
  useEffect(() => {
    if (isLoginPage) return;
    API.post("/analytics/visit", { page_url: pathname }).catch(() => {});
  }, [pathname, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading || !authorized) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <div className="p-6 flex-1">{children}</div>
      </div>
    </div>
  );
}
