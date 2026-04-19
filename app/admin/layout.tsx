// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import API from "@/lib/api";

// import AdminTopbar from "@/components/admin/AdminTopbar";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const [loading, setLoading] = useState(true);

//   const isLoginPage = pathname === "/admin";

//   useEffect(() => {
//     // ✅ SKIP CHECK FOR LOGIN PAGE
//     if (isLoginPage) {
//       setLoading(false);
//       return;
//     }

//     // 🔒 VERIFY ADMIN SESSION
//     API.get("/admin/verify")
//       .then(() => setLoading(false))
//       .catch(() => {
//         router.replace("/admin");
//       });

//     // 🔒 BLOCK BACK BUTTON
//     window.history.pushState(null, "", window.location.href);
//     window.onpopstate = () => {
//       window.history.go(1);
//     };
//   }, [pathname]);

//   // 🔄 PREVENT FLASH
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-500">
//         Checking authentication...
//       </div>
//     );
//   }

//   // ✅ LOGIN PAGE (NO TOPBAR)
//   if (isLoginPage) {
//     return <>{children}</>;
//   }

//   // 🔒 PROTECTED ADMIN UI
//   return (
//     <div className="flex">
//       <div className="flex-1 flex flex-col min-h-screen bg-gray-100">

//         {/* <AdminTopbar /> */}

//         <div className="p-6">{children}</div>

//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import API from "@/lib/api";

import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [authorized, setAuthorized] = useState(false);

  const isLoginPage = pathname === "/admin";

  useEffect(() => {
    // ✅ LOGIN PAGE → SKIP CHECK
    if (isLoginPage) {
      setAuthorized(true);
      return;
    }

    // 🔒 STRICT VERIFY
    const verify = async () => {
      try {
        await API.get("/admin/verify");
        setAuthorized(true);
      } catch {
        // 🚨 FORCE LOGOUT + REDIRECT
        await API.post("/admin/logout").catch(() => {});
        router.replace("/admin");
      }
    };

    verify();
  }, [pathname]);

  // 🚫 BLOCK RENDER UNTIL VERIFIED
  if (!authorized) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // ✅ LOGIN PAGE (NO ADMIN UI)
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col min-h-screen bg-gray-100">

        <AdminTopbar />

        <div className="p-6">{children}</div>

      </div>
    </div>
  );
}