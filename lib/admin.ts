import API from "./api";

export async function adminLogout(): Promise<boolean> {
  if (!confirm("Are you sure you want to logout?")) return false;

  try {
    await API.post("/admin/logout");
  } catch {}

  return true;
}
