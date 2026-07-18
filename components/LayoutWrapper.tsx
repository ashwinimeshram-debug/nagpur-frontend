"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import API from "@/lib/api";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  // Track public page visits
  useEffect(() => {
    if (isAdminRoute) return;
    API.post("/analytics/visit", { page_url: pathname }).catch(() => {});
  }, [pathname, isAdminRoute]);

  return (
    <>
      {!isAdminRoute && <Navbar />}

      {children}
    </>
  );
}