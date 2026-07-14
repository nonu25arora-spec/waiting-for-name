import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AlertCircle, Lock, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AdminLoginModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminLoginModal({
  open,
  onClose,
  onSuccess,
}: AdminLoginModalProps) {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setEmail("");
      setPassword("");
      setError("");
      setTimeout(() => emailRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const ok = login(email.trim(), password);
      setLoading(false);
      if (ok) {
        onSuccess();
        onClose();
      } else {
        setError("Invalid email or password. Please try again.");
      }
    }, 350);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{ background: "oklch(0.04 0.01 44 / 0.85)" }}
            onClick={onClose}
          />
          {/* Modal */}
          <motion.dialog
            key="modal"
            open
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed z-50 inset-0 flex items-center justify-center px-4 m-0 p-0 max-w-none max-h-none w-full h-full border-none bg-transparent"
            aria-label="Admin Login"
          >
            <div
              className="w-full max-w-sm rounded-2xl border-2 shadow-elevated overflow-hidden"
              style={{
                background: "oklch(0.12 0.02 45)",
                borderColor: "oklch(0.65 0.18 65 / 0.5)",
                boxShadow:
                  "0 0 0 1px oklch(0.65 0.18 65 / 0.15), 0 32px 80px oklch(0.04 0.01 44 / 0.9)",
              }}
              onClick={(e) => e.stopPropagation()}
              data-ocid="admin.login_modal"
              onKeyDown={(e) => e.stopPropagation()}
            >
              <div className="h-1 w-full gradient-primary" />
              <div className="p-7">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
                      <Lock className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <h2
                      className="font-display font-bold text-lg"
                      style={{ color: "oklch(0.65 0.18 65)" }}
                    >
                      Admin Login
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-muted"
                    style={{ color: "oklch(0.6 0.04 65)" }}
                    aria-label="Close"
                    data-ocid="admin.login_close_button"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="admin-email"
                      className="text-sm font-medium"
                      style={{ color: "oklch(0.82 0.02 65)" }}
                    >
                      Email
                    </Label>
                    <Input
                      ref={emailRef}
                      id="admin-email"
                      type="email"
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      data-ocid="admin.email_input"
                      style={{
                        background: "oklch(0.09 0.015 45)",
                        borderColor: "oklch(0.35 0.03 50)",
                        color: "oklch(0.95 0.01 70)",
                        height: "44px",
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="admin-password"
                      className="text-sm font-medium"
                      style={{ color: "oklch(0.82 0.02 65)" }}
                    >
                      Password
                    </Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      data-ocid="admin.password_input"
                      style={{
                        background: "oklch(0.09 0.015 45)",
                        borderColor: "oklch(0.35 0.03 50)",
                        color: "oklch(0.95 0.01 70)",
                        height: "44px",
                      }}
                    />
                  </div>

                  {error && (
                    <div
                      className="flex items-center gap-2 rounded-lg p-3"
                      style={{ background: "oklch(0.35 0.12 25 / 0.2)" }}
                      data-ocid="admin.login_error_state"
                    >
                      <AlertCircle
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: "oklch(0.65 0.18 25)" }}
                      />
                      <p
                        className="text-sm"
                        style={{ color: "oklch(0.75 0.1 25)" }}
                      >
                        {error}
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full gradient-primary text-primary-foreground font-bold hover:opacity-90 transition-smooth"
                    style={{ height: "44px" }}
                    data-ocid="admin.login_submit_button"
                  >
                    {loading ? "Verifying…" : "Sign In"}
                  </Button>
                </form>
              </div>
            </div>
          </motion.dialog>
        </>
      )}
    </AnimatePresence>
  );
}
