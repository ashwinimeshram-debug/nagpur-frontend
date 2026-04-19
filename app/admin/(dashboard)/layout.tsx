import Sidebar from "@/components/admin/Sidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({ children }: any) {
  return (
    <div className="flex">

      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Right Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-gray-100">

        {/* 🔥 TOPBAR */}
        {/* <AdminTopbar /> */}

        {/* PAGE CONTENT */}
        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
}