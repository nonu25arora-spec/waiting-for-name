import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  Apple,
  BarChart3,
  BookOpen,
  ChevronRight,
  ClipboardList,
  Dumbbell,
  Scale,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface SubFeature {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subFeatures?: SubFeature[];
}

// ── Data ────────────────────────────────────────────────────────────────────
const tgoSubFeatures: SubFeature[] = [
  { icon: Video, label: "Workout video instructions" },
  { icon: Activity, label: "Calories tracker" },
  { icon: Apple, label: "Easy recipes" },
  { icon: Scale, label: "Weight & measurements tracker" },
  { icon: Sparkles, label: "And many more features" },
];

const programFeatures: Feature[] = [
  { icon: BookOpen, title: "App Access (TGO)", subFeatures: tgoSubFeatures },
  { icon: ClipboardList, title: "Personalised Nutrition Plan" },
  { icon: Dumbbell, title: "Customised Workout Plan" },
  {
    icon: Users,
    title: "Daily Guidance, Support & Accountability from 2 Dedicated Coaches",
  },
  { icon: BarChart3, title: "Progress Tracking & Review Calls" },
];

// ── Sub-feature mini row ─────────────────────────────────────────────────────
function SubFeatureRow({
  icon: Icon,
  label,
  index,
}: SubFeature & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.35 }}
      className="flex items-center gap-2.5 py-2 px-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors duration-200"
    >
      <Icon className="w-4 h-4 text-primary flex-shrink-0" />
      <span className="text-sm text-foreground">{label}</span>
    </motion.div>
  );
}

// ── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({
  icon: Icon,
  title,
  subFeatures,
  index,
}: Feature & { index: number }) {
  const isApp = !!subFeatures;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: "easeOut" }}
      data-ocid={`program.item.${index + 1}`}
      className={`relative rounded-2xl border border-border bg-card shadow-subtle overflow-hidden group ${
        isApp ? "col-span-full" : ""
      }`}
    >
      <div className="h-1 w-full gradient-primary" />
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4 mb-3">
          <motion.div
            whileHover={{ scale: 1.12, rotate: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex-shrink-0 w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-md"
          >
            <Icon className="w-5 h-5 text-primary-foreground" />
          </motion.div>
          <div className="min-w-0">
            <p className="font-display font-semibold text-foreground leading-snug">
              {title}
            </p>
          </div>
        </div>
        {subFeatures && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
            {subFeatures.map((sf, i) => (
              <SubFeatureRow key={sf.label} {...sf} index={i} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function ProgramPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { actor } = useActor(createActor);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    else if (!/^[\d\s+\-]{7,15}$/.test(form.phone.trim()))
      e.phone = "Enter a valid phone number.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!agreed) e.terms = "You must agree to the Terms & Conditions.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      if (actor) {
        await actor.submitLead(
          form.name.trim(),
          form.phone.trim(),
          form.email.trim(),
          agreed,
        );
      }
    } catch {
      // Proceed to payment regardless
    } finally {
      setSubmitting(false);
    }
    navigate({ to: "/payment" });
  }

  function handleBlur(field: string) {
    const e = { ...errors };
    if (field === "name" && form.name.trim()) e.name = undefined;
    if (field === "phone" && /^[\d\s+\-]{7,15}$/.test(form.phone.trim()))
      e.phone = undefined;
    if (field === "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = undefined;
    setErrors(e);
  }

  return (
    <div>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 sm:py-28"
        style={{ background: "oklch(0.11 0.02 45)" }}
        data-ocid="hero.section"
      >
        {/* Decorative radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, oklch(0.65 0.18 65 / 0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl font-bold leading-tight mb-6"
            style={{ color: "oklch(0.97 0.01 70)" }}
          >
            Trained By Nipun{" "}
            <span
              className="block sm:inline"
              style={{ color: "oklch(0.65 0.18 65)" }}
            >
              Transformation Program
            </span>
          </motion.h1>
        </div>
      </section>

      {/* ── Program Includes ───────────────────────────────────────── */}
      <section
        className="py-6 sm:py-8"
        style={{ background: "oklch(0.13 0.022 46)" }}
        data-ocid="program.section"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-5"
          >
            <p
              className="text-xs font-medium tracking-widest uppercase mb-1"
              style={{ color: "oklch(0.65 0.18 65 / 0.65)" }}
            >
              What You Get
            </p>
            <h2
              className="font-display text-lg sm:text-xl font-semibold"
              style={{ color: "oklch(0.8 0.04 65)" }}
            >
              Program Includes:
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 opacity-90">
            {programFeatures.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Enrollment Form ────────────────────────────────────────── */}
      <section
        id="enroll"
        className="py-16 sm:py-24"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, oklch(0.65 0.18 65 / 0.18) 0%, oklch(0.09 0.018 44) 70%)",
        }}
        data-ocid="enroll.section"
      >
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <div
              className="rounded-3xl border-2 shadow-elevated overflow-hidden"
              style={{
                background: "oklch(0.13 0.022 46)",
                borderColor: "oklch(0.65 0.18 65 / 0.55)",
                boxShadow:
                  "0 0 0 1px oklch(0.65 0.18 65 / 0.2), 0 32px 80px oklch(0.04 0.01 44 / 0.9), 0 0 60px oklch(0.65 0.18 65 / 0.08)",
              }}
            >
              <div className="h-2 gradient-primary" />
              <div className="p-8 sm:p-12">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  data-ocid="enroll.form"
                >
                  <div className="space-y-7">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-base font-semibold"
                        style={{ color: "oklch(0.9 0.02 65)" }}
                      >
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        onBlur={() => handleBlur("name")}
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                        data-ocid="enroll.name_input"
                        className="h-13 text-base"
                        style={{
                          background: "oklch(0.10 0.018 45)",
                          borderColor: errors.name
                            ? undefined
                            : "oklch(0.38 0.03 50)",
                          color: "oklch(0.95 0.01 70)",
                          height: "52px",
                          fontSize: "1rem",
                        }}
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          className="text-sm text-destructive"
                          data-ocid="enroll.name_field_error"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-base font-semibold"
                        style={{ color: "oklch(0.9 0.02 65)" }}
                      >
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        onBlur={() => handleBlur("phone")}
                        aria-invalid={!!errors.phone}
                        aria-describedby={
                          errors.phone ? "phone-error" : undefined
                        }
                        data-ocid="enroll.phone_input"
                        style={{
                          background: "oklch(0.10 0.018 45)",
                          borderColor: errors.phone
                            ? undefined
                            : "oklch(0.38 0.03 50)",
                          color: "oklch(0.95 0.01 70)",
                          height: "52px",
                          fontSize: "1rem",
                        }}
                      />
                      {errors.phone && (
                        <p
                          id="phone-error"
                          className="text-sm text-destructive"
                          data-ocid="enroll.phone_field_error"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-base font-semibold"
                        style={{ color: "oklch(0.9 0.02 65)" }}
                      >
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        onBlur={() => handleBlur("email")}
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        data-ocid="enroll.email_input"
                        style={{
                          background: "oklch(0.10 0.018 45)",
                          borderColor: errors.email
                            ? undefined
                            : "oklch(0.38 0.03 50)",
                          color: "oklch(0.95 0.01 70)",
                          height: "52px",
                          fontSize: "1rem",
                        }}
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="text-sm text-destructive"
                          data-ocid="enroll.email_field_error"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Terms */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="terms"
                          checked={agreed}
                          onCheckedChange={(checked) =>
                            setAgreed(checked === true)
                          }
                          aria-invalid={!!errors.terms}
                          aria-describedby={
                            errors.terms ? "terms-error" : undefined
                          }
                          data-ocid="enroll.terms_checkbox"
                          className="mt-1"
                        />
                        <Label
                          htmlFor="terms"
                          className="text-sm leading-relaxed cursor-pointer"
                          style={{ color: "oklch(0.72 0.02 58)" }}
                        >
                          Yes, I agree to the{" "}
                          <Link
                            to="/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold transition-smooth hover:opacity-70"
                            style={{
                              color: "oklch(0.52 0.1 58)",
                              textDecoration: "underline",
                              textDecorationColor: "oklch(0.52 0.1 58 / 0.45)",
                            }}
                            data-ocid="enroll.terms_link"
                          >
                            Terms &amp; Conditions
                          </Link>
                        </Label>
                      </div>
                      {errors.terms && (
                        <p
                          id="terms-error"
                          className="text-sm text-destructive"
                          data-ocid="enroll.terms_field_error"
                        >
                          {errors.terms}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="w-full gradient-primary text-primary-foreground font-bold hover:opacity-90 transition-smooth shadow-elevated text-base"
                      style={{ height: "56px", fontSize: "1.05rem" }}
                      data-ocid="enroll.submit_button"
                    >
                      {submitting ? (
                        "Submitting…"
                      ) : (
                        <>
                          Proceed to Payment{" "}
                          <ChevronRight className="w-5 h-5 ml-1.5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
