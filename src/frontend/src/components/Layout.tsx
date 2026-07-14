import { AdminLoginModal } from "@/components/AdminLoginModal";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Link, useRouter } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAdminAuth();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  function handleAdminClick() {
    if (isAuthenticated) {
      router.navigate({ to: "/admin" });
    } else {
      setModalOpen(true);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header
        className="bg-header sticky top-0 z-50 shadow-elevated"
        style={{ backgroundColor: "oklch(0.11 0.02 45)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 transition-smooth hover:opacity-85"
            data-ocid="nav.home_link"
          >
            <img
              src="/assets/images/logo.jpeg"
              alt="Trained By Nipun logo"
              className="w-10 h-10 rounded-full object-cover ring-2"
              style={{ boxShadow: "0 0 0 2px oklch(0.65 0.18 65)" }}
            />
            <span
              className="font-display font-bold text-lg leading-tight"
              style={{ color: "oklch(0.65 0.18 65)" }}
            >
              Trained By Nipun
            </span>
          </Link>
          {/* Admin access */}
          <button
            type="button"
            onClick={handleAdminClick}
            aria-label="Admin Dashboard"
            data-ocid="nav.admin_button"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-primary/15"
            style={{
              color: isAuthenticated
                ? "oklch(0.65 0.18 65)"
                : "oklch(0.4 0.03 50)",
            }}
            title={isAuthenticated ? "Go to Admin" : "Admin Login"}
          >
            <Shield
              className="w-4.5 h-4.5"
              style={{ width: "18px", height: "18px" }}
            />
          </button>
        </div>
      </header>
      <AdminLoginModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => router.navigate({ to: "/admin" })}
      />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer
        className="border-t mt-auto"
        style={{
          backgroundColor: "oklch(0.11 0.02 45)",
          borderColor: "oklch(0.65 0.18 65 / 0.25)",
        }}
        data-ocid="footer"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/images/logo.jpeg"
                alt="TBN logo"
                className="w-7 h-7 rounded-full object-cover"
                style={{ boxShadow: "0 0 0 1.5px oklch(0.65 0.18 65)" }}
              />
              <span
                className="text-sm font-display font-semibold"
                style={{ color: "oklch(0.75 0.15 65)" }}
              >
                Trained By Nipun
              </span>
            </div>
            <p
              className="text-xs text-center"
              style={{ color: "oklch(0.6 0.04 65)" }}
            >
              &copy; {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-smooth"
                style={{ color: "oklch(0.65 0.18 65)" }}
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
