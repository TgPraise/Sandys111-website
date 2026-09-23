import { useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLogin() {
  const { login, loading } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    const ok = login(password);
    if (!ok) setError(true);
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-gold">Staff only</span>
      <h1 className="mt-4 font-display text-4xl text-cream sm:text-5xl">Admin</h1>
      <p className="mt-3 max-w-xs text-sm text-paper-dim">
        Enter the shared admin password to manage events.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-xs flex-col gap-4">
        <input
          type="password"
          autoFocus
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          className="w-full border-b hairline-dark bg-transparent py-3 text-center text-cream outline-none focus:border-gold"
        />
        {error && <p className="text-sm text-pink-400">Incorrect password — try again.</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gold py-3 font-medium text-charcoal transition-all hover:shadow-glow disabled:opacity-50"
        >
          {loading ? "Loading…" : "Enter"}
        </button>
      </form>
    </section>
  );
}
