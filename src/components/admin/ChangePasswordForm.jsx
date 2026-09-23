import { useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function ChangePasswordForm() {
  const { changePassword } = useAdminAuth();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState(null); // { type: "error" | "success", message }
  const [submitting, setSubmitting] = useState(false);

  const inputClass =
    "w-full border-b hairline-dark bg-transparent py-2.5 text-cream placeholder:text-paper-dim/50 outline-none focus:border-gold";

  const reset = () => {
    setCurrent("");
    setNext("");
    setConfirm("");
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (next !== confirm) {
      setStatus({ type: "error", message: "New passwords don't match." });
      return;
    }

    setSubmitting(true);
    const result = await changePassword(current, next);
    setSubmitting(false);

    if (result.success) {
      setStatus({ type: "success", message: "Password updated." });
      setCurrent("");
      setNext("");
      setConfirm("");
    } else {
      setStatus({ type: "error", message: result.error });
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-paper-dim underline hover:text-cream"
      >
        Change password
      </button>
    );
  }

  return (
    <div className="rounded-sm border hairline-dark p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg text-cream">Change admin password</h3>
        <button
          onClick={() => {
            setOpen(false);
            reset();
          }}
          className="text-xs text-paper-dim hover:text-cream"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          required
          placeholder="Current password"
          className={inputClass}
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="New password"
          className={inputClass}
          value={next}
          onChange={(e) => setNext(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Confirm new password"
          className={inputClass}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {status && (
          <p className={`text-sm ${status.type === "error" ? "text-pink-400" : "text-gold-light"}`}>
            {status.message}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-gold py-2.5 text-sm font-medium text-charcoal transition-all hover:shadow-glow disabled:opacity-50"
        >
          {submitting ? "Updating…" : "Update password"}
        </button>
      </form>

      <p className="mt-3 text-xs text-paper-dim/70">
        Share the new password with your team directly — there's no
        automatic notification when it changes.
      </p>
    </div>
  );
}
