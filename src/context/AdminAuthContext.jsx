import { createContext, useContext, useEffect, useState } from "react";
import { adminSettingsStore } from "../lib/adminSettingsStore";

const AdminAuthContext = createContext(null);
const STORAGE_KEY = "sandys111-admin-authed";

// The password is compared client-side against a value pulled from
// adminSettingsStore. This is a convenience gate to keep casual visitors
// out of /admin, NOT real security — anyone who opens devtools can watch
// the comparison happen or bypass it entirely. Fine for hiding a
// low-stakes internal tool behind a shared password; do not use this
// pattern for anything that needs to actually be secure. See ADMIN.md.
export function AdminAuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => localStorage.getItem(STORAGE_KEY) === "1");
  const [currentPassword, setCurrentPassword] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminSettingsStore.getPassword().then((pw) => {
      setCurrentPassword(pw);
      setLoading(false);
    });
  }, []);

  const login = (password) => {
    if (currentPassword !== null && password === currentPassword) {
      localStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
  };

  const changePassword = async (currentInput, newPassword) => {
    if (currentInput !== currentPassword) {
      return { success: false, error: "Current password is incorrect." };
    }
    if (!newPassword || newPassword.length < 4) {
      return { success: false, error: "New password must be at least 4 characters." };
    }
    await adminSettingsStore.setPassword(newPassword);
    setCurrentPassword(newPassword);
    return { success: true };
  };

  return (
    <AdminAuthContext.Provider
      value={{ authed, loading, login, logout, changePassword }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
