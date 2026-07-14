import { createActor } from "@/backend";
import type { LeadPublic } from "@/backend";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  Check,
  ChevronDown,
  ChevronUp,
  LogOut,
  RefreshCw,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Editable cell ─────────────────────────────────────────────────────────────
function EditableCell({
  value,
  placeholder,
  onSave,
  ocid,
  prefix,
}: {
  value: string;
  placeholder: string;
  onSave: (v: string) => void;
  ocid: string;
  prefix?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  function startEdit() {
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 30);
  }

  function commit() {
    setEditing(false);
    if (draft !== value) onSave(draft);
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") {
            setDraft(value);
            setEditing(false);
          }
        }}
        placeholder={placeholder}
        data-ocid={ocid}
        className="w-full min-w-[80px] rounded px-2 py-1 text-sm outline-none focus:ring-1"
        style={{
          background: "oklch(0.09 0.015 45)",
          color: "oklch(0.95 0.01 70)",
          border: "1px solid oklch(0.65 0.18 65 / 0.5)",
          boxShadow: "0 0 0 1px oklch(0.65 0.18 65 / 0.2)",
        }}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={startEdit}
      data-ocid={ocid}
      title="Click to edit"
      className="w-full text-left rounded px-2 py-1 text-sm transition-colors duration-150 hover:bg-primary/10 min-h-[32px] group"
      style={{ color: value ? "oklch(0.9 0.02 65)" : "oklch(0.45 0.03 55)" }}
    >
      {prefix && value
        ? `${prefix}${value}`
        : value || (
            <span style={{ color: "oklch(0.42 0.03 55)" }}>{placeholder}</span>
          )}
    </button>
  );
}

// ── Local storage for pending payment dates ──────────────────────────────
const PENDING_DATE_KEY = "tbn_pending_dates";

function getPendingDates(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(PENDING_DATE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function setPendingDateLS(id: string, date: string) {
  const existing = getPendingDates();
  existing[id] = date;
  localStorage.setItem(PENDING_DATE_KEY, JSON.stringify(existing));
}

// ── Editable date cell ───────────────────────────────────────────────────────
function EditableDateCell({
  value,
  onSave,
  ocid,
}: {
  value: string;
  onSave: (v: string) => void;
  ocid: string;
}) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  function startEdit() {
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 30);
  }

  function commit() {
    setEditing(false);
    if (draft !== value) onSave(draft);
  }

  const displayDate = value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="date"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") {
            setDraft(value);
            setEditing(false);
          }
        }}
        data-ocid={ocid}
        className="w-full min-w-[110px] rounded px-2 py-1 text-sm outline-none focus:ring-1"
        style={{
          background: "oklch(0.09 0.015 45)",
          color: "oklch(0.95 0.01 70)",
          border: "1px solid oklch(0.65 0.18 65 / 0.5)",
          boxShadow: "0 0 0 1px oklch(0.65 0.18 65 / 0.2)",
          colorScheme: "dark",
        }}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={startEdit}
      data-ocid={ocid}
      title="Click to set date"
      className="w-full text-left rounded px-2 py-1 text-sm transition-colors duration-150 hover:bg-primary/10 min-h-[32px]"
      style={{
        color: displayDate ? "oklch(0.9 0.02 65)" : "oklch(0.45 0.03 55)",
      }}
    >
      {displayDate || (
        <span style={{ color: "oklch(0.42 0.03 55)" }}>Set date</span>
      )}
    </button>
  );
}

// ── Format date from nanoseconds bigint ───────────────────────────────────────
function formatDate(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  const d = new Date(ms);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ── Month/year helpers ────────────────────────────────────────────────────────
function getMonthYear(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  const d = new Date(ms);
  return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

function getMonthYearSortKey(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

// ── Filter chip ───────────────────────────────────────────────────────────────
function FilterChip({
  label,
  active,
  onClick,
  ocid,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  ocid: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={ocid}
      className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 border whitespace-nowrap"
      style={{
        background: active ? "oklch(0.65 0.18 65 / 0.18)" : "transparent",
        borderColor: active
          ? "oklch(0.65 0.18 65 / 0.6)"
          : "oklch(0.65 0.18 65 / 0.2)",
        color: active ? "oklch(0.65 0.18 65)" : "oklch(0.55 0.04 55)",
      }}
    >
      {label}
    </button>
  );
}

// ── Month group table ─────────────────────────────────────────────────────────
function MonthGroup({
  label,
  leads,
  pendingDates,
  onAmountPaid,
  onPendingAmount,
  onSoldBy,
  onPendingDate,
  onDelete,
  baseIndex,
}: {
  label: string;
  leads: LeadPublic[];
  pendingDates: Record<string, string>;
  onAmountPaid: (id: bigint, v: string) => void;
  onPendingAmount: (id: bigint, v: string) => void;
  onSoldBy: (id: bigint, v: string) => void;
  onPendingDate: (id: string, v: string) => void;
  onDelete: (id: bigint) => void;
  baseIndex: number;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const totalAmountPaid = leads.reduce((sum, l) => {
    const n = Number.parseFloat(l.amountPaid.replace(/[^0-9.]/g, ""));
    return sum + (Number.isNaN(n) ? 0 : n);
  }, 0);

  const COLS = [
    "Date",
    "Name",
    "Phone",
    "Email",
    "Terms & Conditions Agreement",
    "Amount Paid (INR)",
    "Pending Amount (INR)",
    "Payment Date",
    "Sold By",
    "Delete",
  ];
  return (
    <div
      className="rounded-2xl border overflow-hidden mb-6"
      style={{
        borderColor: "oklch(0.65 0.18 65 / 0.2)",
        boxShadow: "0 4px 24px oklch(0.04 0.01 44 / 0.4)",
      }}
    >
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="w-full flex items-center justify-between px-5 py-3.5 transition-colors duration-150"
        style={{
          background: "oklch(0.14 0.025 46)",
          borderBottom: collapsed
            ? "none"
            : "1px solid oklch(0.65 0.18 65 / 0.2)",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="font-display font-bold text-base"
            style={{ color: "oklch(0.65 0.18 65)" }}
          >
            {label}
          </span>
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-semibold border"
            style={{
              background: "oklch(0.65 0.18 65 / 0.12)",
              borderColor: "oklch(0.65 0.18 65 / 0.25)",
              color: "oklch(0.65 0.18 65)",
            }}
          >
            {leads.length} lead{leads.length !== 1 ? "s" : ""}
          </span>
          {totalAmountPaid > 0 && (
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold border ml-1"
              style={{
                background: "oklch(0.3 0.12 140 / 0.15)",
                borderColor: "oklch(0.55 0.15 140 / 0.3)",
                color: "oklch(0.7 0.15 140)",
              }}
            >
              Total Paid: ₹{totalAmountPaid.toLocaleString("en-IN")}
            </span>
          )}
        </div>
        {collapsed ? (
          <ChevronDown
            className="w-4 h-4"
            style={{ color: "oklch(0.55 0.04 55)" }}
          />
        ) : (
          <ChevronUp
            className="w-4 h-4"
            style={{ color: "oklch(0.55 0.04 55)" }}
          />
        )}
      </button>
      {!collapsed && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                style={{
                  background: "oklch(0.13 0.022 46)",
                  borderBottom: "1px solid oklch(0.65 0.18 65 / 0.18)",
                }}
              >
                {COLS.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                    style={{ color: "oklch(0.65 0.18 65)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => {
                const rowIdx = baseIndex + i + 1;
                const idStr = String(lead.id);
                return (
                  <tr
                    key={idStr}
                    data-ocid={`admin.lead.item.${rowIdx}`}
                    className="group transition-colors duration-150"
                    style={{
                      background:
                        i % 2 === 0
                          ? "oklch(0.11 0.018 45)"
                          : "oklch(0.115 0.019 45)",
                      borderBottom: "1px solid oklch(0.65 0.18 65 / 0.07)",
                    }}
                  >
                    <td
                      className="px-4 py-3 text-sm whitespace-nowrap"
                      style={{ color: "oklch(0.6 0.04 58)" }}
                    >
                      {formatDate(lead.createdAt)}
                    </td>
                    <td
                      className="px-4 py-3 text-sm font-medium whitespace-nowrap"
                      style={{ color: "oklch(0.9 0.02 65)" }}
                    >
                      {lead.name}
                    </td>
                    <td
                      className="px-4 py-3 text-sm whitespace-nowrap"
                      style={{ color: "oklch(0.78 0.02 60)" }}
                    >
                      {lead.phone}
                    </td>
                    <td
                      className="px-4 py-3 text-sm"
                      style={{ color: "oklch(0.78 0.02 60)" }}
                    >
                      <span className="truncate block max-w-[180px]">
                        {lead.email}
                      </span>
                    </td>
                    <td className="px-4 py-3 min-w-[160px]">
                      {lead.termsAccepted ? (
                        <div className="flex flex-col gap-0.5">
                          <span
                            className="inline-flex items-center gap-1 text-xs font-semibold"
                            style={{ color: "oklch(0.65 0.18 65)" }}
                          >
                            <Check className="w-3 h-3 flex-shrink-0" />
                            Agreed
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "oklch(0.55 0.04 55)" }}
                          >
                            {(() => {
                              const ms = Number(lead.createdAt / 1_000_000n);
                              const d = new Date(ms);
                              const day = String(d.getDate()).padStart(2, "0");
                              const mon = String(d.getMonth() + 1).padStart(
                                2,
                                "0",
                              );
                              const yr = d.getFullYear();
                              const hr = String(d.getHours()).padStart(2, "0");
                              const min = String(d.getMinutes()).padStart(
                                2,
                                "0",
                              );
                              return `${day}/${mon}/${yr} ${hr}:${min}`;
                            })()}
                          </span>
                        </div>
                      ) : (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: "oklch(0.35 0.08 25 / 0.2)",
                            color: "oklch(0.65 0.1 25)",
                          }}
                        >
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 min-w-[120px]">
                      <EditableCell
                        value={lead.amountPaid}
                        placeholder="Enter amount"
                        prefix="INR"
                        onSave={(v) => onAmountPaid(lead.id, v)}
                        ocid={`admin.amount_paid.${rowIdx}`}
                      />
                    </td>
                    <td className="px-3 py-2 min-w-[120px]">
                      <EditableCell
                        value={lead.pendingAmount}
                        placeholder="-"
                        prefix="INR"
                        onSave={(v) => onPendingAmount(lead.id, v)}
                        ocid={`admin.pending_amount.${rowIdx}`}
                      />
                    </td>
                    <td className="px-3 py-2 min-w-[130px]">
                      <EditableDateCell
                        value={pendingDates[idStr] ?? ""}
                        onSave={(v) => onPendingDate(idStr, v)}
                        ocid={`admin.pending_date.${rowIdx}`}
                      />
                    </td>
                    <td className="px-3 py-2 min-w-[120px]">
                      <EditableCell
                        value={lead.soldBy}
                        placeholder="Enter name"
                        onSave={(v) => onSoldBy(lead.id, v)}
                        ocid={`admin.sold_by.${rowIdx}`}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Delete lead "${lead.name}"? This cannot be undone.`,
                            )
                          ) {
                            onDelete(lead.id);
                          }
                        }}
                        data-ocid={`admin.delete_button.${rowIdx}`}
                        title="Delete lead"
                        aria-label={`Delete lead ${lead.name}`}
                        className="flex items-center justify-center w-7 h-7 rounded transition-colors duration-150 hover:bg-red-900/30"
                        style={{ color: "oklch(0.6 0.12 25)" }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const [leads, setLeads] = useState<LeadPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [pendingDates, setPendingDates] =
    useState<Record<string, string>>(getPendingDates);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const [soldByFilter, setSoldByFilter] = useState<
    "All" | "Saim" | "Ujjawal" | "Nipun"
  >("All");

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/" });
  }, [isAuthenticated, navigate]);

  const fetchLeads = useCallback(async () => {
    if (!actor) return;
    try {
      const data = await actor.getAllLeads();
      const sorted = [...data].sort((a, b) =>
        b.createdAt > a.createdAt ? 1 : -1,
      );
      setLeads(sorted);
      setLastRefresh(new Date());
      setError("");
    } catch {
      setError("Failed to load leads. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    if (actor && !isFetching) fetchLeads();
  }, [actor, isFetching, fetchLeads]);

  useEffect(() => {
    if (!actor || !isAuthenticated) return;
    pollRef.current = setInterval(() => fetchLeads(), 5000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [actor, isAuthenticated, fetchLeads]);

  async function handleAmountPaid(id: bigint, value: string) {
    if (!actor) return;
    await actor.updateLeadAmountPaid(id, value);
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, amountPaid: value } : l)),
    );
  }

  async function handlePendingAmount(id: bigint, value: string) {
    if (!actor) return;
    await actor.updateLeadPendingAmount(id, value);
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, pendingAmount: value } : l)),
    );
  }

  async function handleSoldBy(id: bigint, value: string) {
    if (!actor) return;
    await actor.updateLeadSoldBy(id, value);
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, soldBy: value } : l)),
    );
  }

  async function handleDelete(id: bigint) {
    if (!actor) return;
    await actor.deleteLead(id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  function handlePendingDate(id: string, date: string) {
    setPendingDateLS(id, date);
    setPendingDates((prev) => ({ ...prev, [id]: date }));
  }

  function handleLogout() {
    logout();
    navigate({ to: "/" });
  }

  function applyFilters(list: LeadPublic[]): LeadPublic[] {
    let filtered = list;
    if (showPendingOnly) {
      filtered = filtered.filter((l) => {
        const p = l.pendingAmount.trim();
        return p !== "" && p !== "0";
      });
    }
    if (soldByFilter !== "All") {
      filtered = filtered.filter(
        (l) => l.soldBy.trim().toLowerCase() === soldByFilter.toLowerCase(),
      );
    }
    return filtered;
  }

  function groupByMonth(
    list: LeadPublic[],
  ): Array<{ key: string; label: string; leads: LeadPublic[] }> {
    const groups: Record<string, { label: string; leads: LeadPublic[] }> = {};
    for (const lead of list) {
      const key = getMonthYearSortKey(lead.createdAt);
      const label = getMonthYear(lead.createdAt);
      if (!groups[key]) groups[key] = { label, leads: [] };
      groups[key].leads.push(lead);
    }
    return Object.entries(groups)
      .sort(([a], [b]) => (a > b ? -1 : 1))
      .map(([key, val]) => ({ key, ...val }));
  }

  const filteredLeads = applyFilters(leads);
  const monthGroups = groupByMonth(filteredLeads);
  const SKELETON_COLS = [
    "Date",
    "Name",
    "Phone",
    "Email",
    "T&C",
    "Amount Paid (INR)",
    "Pending Amount (INR)",
    "Payment Date",
    "Sold By",
    "Delete",
  ];

  if (!isAuthenticated) return null;

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.10 0.018 45)" }}
      data-ocid="admin.page"
    >
      <div
        className="sticky top-0 z-20 border-b"
        style={{
          background: "oklch(0.12 0.022 46)",
          borderColor: "oklch(0.65 0.18 65 / 0.2)",
          boxShadow: "0 2px 20px oklch(0.04 0.01 44 / 0.5)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1
                className="font-display font-bold text-base leading-tight"
                style={{ color: "oklch(0.65 0.18 65)" }}
              >
                Admin Dashboard
              </h1>
              <p className="text-xs" style={{ color: "oklch(0.5 0.04 55)" }}>
                Trained By Nipun
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchLeads}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-muted"
              style={{ color: "oklch(0.55 0.04 55)" }}
              title="Refresh"
              data-ocid="admin.refresh_button"
              aria-label="Refresh leads"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border text-sm font-medium"
              style={{
                borderColor: "oklch(0.65 0.18 65 / 0.35)",
                color: "oklch(0.65 0.18 65)",
                background: "transparent",
              }}
              data-ocid="admin.logout_button"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats bar */}
        <div className="flex flex-wrap items-center gap-4 mb-5">
          <div
            className="rounded-xl px-4 py-3 flex items-center gap-3 border"
            style={{
              background: "oklch(0.13 0.022 46)",
              borderColor: "oklch(0.65 0.18 65 / 0.2)",
            }}
          >
            <span
              className="font-display font-bold text-2xl"
              style={{ color: "oklch(0.65 0.18 65)" }}
            >
              {leads.length}
            </span>
            <span className="text-sm" style={{ color: "oklch(0.6 0.04 58)" }}>
              Total Leads
            </span>
          </div>
          {lastRefresh && (
            <span className="text-xs" style={{ color: "oklch(0.42 0.03 55)" }}>
              Last updated: {lastRefresh.toLocaleTimeString()}
            </span>
          )}
        </div>

        {/* Filter Bar */}
        <div
          className="flex flex-wrap items-center gap-2 mb-6 px-4 py-3 rounded-xl border"
          style={{
            background: "oklch(0.13 0.022 46)",
            borderColor: "oklch(0.65 0.18 65 / 0.15)",
          }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-wider mr-1"
            style={{ color: "oklch(0.5 0.04 55)" }}
          >
            Filters:
          </span>
          <FilterChip
            label="Show Pending Only"
            active={showPendingOnly}
            onClick={() => setShowPendingOnly((v) => !v)}
            ocid="admin.filter.pending_toggle"
          />
          <div className="flex items-center gap-1.5 ml-2">
            <span className="text-xs" style={{ color: "oklch(0.5 0.04 55)" }}>
              Sold by:
            </span>
            {(["All", "Saim", "Ujjawal", "Nipun"] as const).map((name) => (
              <FilterChip
                key={name}
                label={name}
                active={soldByFilter === name}
                onClick={() => setSoldByFilter(name)}
                ocid={`admin.filter.sold_by.${name.toLowerCase()}`}
              />
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="rounded-xl p-4 mb-6 border text-sm"
            style={{
              background: "oklch(0.18 0.06 25 / 0.3)",
              borderColor: "oklch(0.5 0.12 25 / 0.4)",
              color: "oklch(0.75 0.1 25)",
            }}
            data-ocid="admin.error_state"
          >
            {error}
          </div>
        )}

        {loading ? (
          <div
            className="rounded-2xl border overflow-hidden"
            style={{
              borderColor: "oklch(0.65 0.18 65 / 0.2)",
              boxShadow: "0 4px 24px oklch(0.04 0.01 44 / 0.4)",
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    style={{
                      background: "oklch(0.14 0.025 46)",
                      borderBottom: "1px solid oklch(0.65 0.18 65 / 0.25)",
                    }}
                  >
                    {SKELETON_COLS.map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                        style={{ color: "oklch(0.65 0.18 65)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2, 3].map((ri) => (
                    <tr
                      key={ri}
                      style={{
                        background:
                          ri % 2 === 0
                            ? "oklch(0.11 0.018 45)"
                            : "oklch(0.12 0.02 45)",
                      }}
                    >
                      {/* biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list, order is fixed */}
                      {[
                        "w70",
                        "w80",
                        "w65",
                        "w90",
                        "w40",
                        "w60a",
                        "w60b",
                        "w70b",
                        "w55",
                      ].map((k, ci) => (
                        <td key={k} className="px-4 py-3">
                          <Skeleton
                            className="h-4 rounded"
                            style={{
                              width: `${[70, 80, 65, 90, 40, 60, 60, 70, 55][ci]}%`,
                              background: "oklch(0.18 0.02 48)",
                            }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div
            className="rounded-2xl border px-4 py-16 text-center"
            style={{ borderColor: "oklch(0.65 0.18 65 / 0.2)" }}
            data-ocid="admin.empty_state"
          >
            <p
              className="font-display font-semibold text-base mb-1"
              style={{ color: "oklch(0.55 0.04 55)" }}
            >
              {leads.length === 0
                ? "No leads yet"
                : "No leads match current filters"}
            </p>
            <p className="text-sm" style={{ color: "oklch(0.4 0.03 50)" }}>
              {leads.length === 0
                ? "Submissions will appear here once the form is filled."
                : "Try adjusting or clearing your filters."}
            </p>
          </div>
        ) : (
          <>
            {monthGroups.map((group) => {
              const groupIdx = monthGroups.indexOf(group);
              const baseIndex = monthGroups
                .slice(0, groupIdx)
                .reduce((acc, g) => acc + g.leads.length, 0);
              return (
                <MonthGroup
                  key={group.key}
                  label={group.label}
                  leads={group.leads}
                  pendingDates={pendingDates}
                  onAmountPaid={handleAmountPaid}
                  onPendingAmount={handlePendingAmount}
                  onSoldBy={handleSoldBy}
                  onPendingDate={handlePendingDate}
                  onDelete={handleDelete}
                  baseIndex={baseIndex}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
