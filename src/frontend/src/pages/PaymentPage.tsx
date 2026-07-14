import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  CreditCard,
  ExternalLink,
  QrCode,
  Smartphone,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${text}`}
      className="ml-2 px-2.5 py-1 rounded-md transition-colors duration-200 flex items-center gap-1.5 text-xs font-medium whitespace-nowrap"
      style={{
        background: copied
          ? "oklch(0.65 0.18 65 / 0.15)"
          : "oklch(0.92 0.02 60 / 0.6)",
        color: copied ? "oklch(0.45 0.18 65)" : "oklch(0.45 0.06 55)",
        border: "1px solid oklch(0.65 0.18 65 / 0.2)",
      }}
      data-ocid="payment.copy_button"
    >
      {copied ? (
        <>
          <CheckCircle2 className="w-3.5 h-3.5" /> Copied!
        </>
      ) : (
        <>📋 Copy</>
      )}
    </button>
  );
}

export default function PaymentPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-12 bg-background" data-ocid="payment.page">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 mb-8"
            style={{ color: "oklch(0.55 0.2 42)" }}
            data-ocid="payment.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Program
          </Link>
        </motion.div>

        {/* Page header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border"
            style={{
              background: "oklch(0.65 0.18 65 / 0.12)",
              color: "oklch(0.55 0.2 42)",
              borderColor: "oklch(0.65 0.18 65 / 0.3)",
            }}
          >
            🔒 Secure Payment
          </div>
          <h1
            className="font-display text-2xl sm:text-3xl font-bold mb-2"
            style={{ color: "oklch(0.18 0.03 45)" }}
          >
            Trained By Nipun
          </h1>
          <p
            className="font-display text-lg sm:text-xl font-semibold mb-3"
            style={{ color: "oklch(0.55 0.2 42)" }}
          >
            Payment Portal
          </p>
          <p className="text-muted-foreground text-sm">
            Choose your preferred payment method below. Your transformation
            starts here.
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Option 1: UPI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Card
              className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
              style={{ border: "1px solid oklch(0.88 0.02 60)" }}
              data-ocid="payment.upi.card"
            >
              <CardContent className="p-6">
                {/* Card header */}
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.18 65), oklch(0.75 0.15 65))",
                    }}
                  >
                    <Smartphone
                      className="w-5 h-5"
                      style={{ color: "oklch(0.11 0.02 45)" }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2
                        className="font-display font-semibold"
                        style={{ color: "oklch(0.18 0.03 45)" }}
                      >
                        UPI Payment
                      </h2>
                      <span className="text-base">✅</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Pay directly using any UPI app
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* UPI ID row */}
                  <div
                    className="flex items-center justify-between p-3 rounded-xl border"
                    style={{
                      background: "oklch(0.96 0.01 60)",
                      borderColor: "oklch(0.65 0.18 65 / 0.15)",
                    }}
                  >
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">
                        🟢 UPI ID
                      </p>
                      <p
                        className="text-sm font-semibold font-body"
                        style={{
                          color: "oklch(0.18 0.03 45)",
                          fontVariantNumeric: "normal",
                          fontFeatureSettings: "'zero' 0",
                        }}
                        data-ocid="payment.upi_id"
                      >
                        7652813250@pthdfc
                      </p>
                    </div>
                    <CopyButton text="7652813250@pthdfc" />
                  </div>

                  {/* UPI Number row */}
                  <div
                    className="flex items-center justify-between p-3 rounded-xl border"
                    style={{
                      background: "oklch(0.96 0.01 60)",
                      borderColor: "oklch(0.65 0.18 65 / 0.15)",
                    }}
                  >
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">
                        📱 UPI Number
                      </p>
                      <p
                        className="text-sm font-semibold font-body"
                        style={{
                          color: "oklch(0.18 0.03 45)",
                          fontVariantNumeric: "normal",
                          fontFeatureSettings: "'zero' 0",
                        }}
                        data-ocid="payment.upi_number"
                      >
                        7652813250
                      </p>
                    </div>
                    <CopyButton text="7652813250" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Option 2: UPI Scanner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
          >
            <Card
              className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
              style={{ border: "1px solid oklch(0.88 0.02 60)" }}
              data-ocid="payment.qr.card"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.18 65), oklch(0.75 0.15 65))",
                    }}
                  >
                    <QrCode
                      className="w-5 h-5"
                      style={{ color: "oklch(0.11 0.02 45)" }}
                    />
                  </div>
                  <div>
                    <h2
                      className="font-display font-semibold"
                      style={{ color: "oklch(0.18 0.03 45)" }}
                    >
                      UPI Scanner
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Scan &amp; pay instantly from your phone
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className="rounded-2xl overflow-hidden border-2 shadow-md"
                    style={{ borderColor: "oklch(0.65 0.18 65 / 0.3)" }}
                    data-ocid="payment.qr_display"
                  >
                    <img
                      src="/assets/images/upi-qr-new.jpeg"
                      alt="UPI QR Code for 7652813250@pthdfc"
                      className="w-52 h-52 object-cover"
                    />
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground text-center">
                    UPI ID:{" "}
                    <span
                      className="font-semibold font-body"
                      style={{
                        color: "oklch(0.18 0.03 45)",
                        fontVariantNumeric: "normal",
                      }}
                    >
                      7652813250@pthdfc
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Works with PhonePe, Google Pay, Paytm, BHIM &amp; more
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Option 3: EMI / Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
          >
            <Card
              className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
              style={{ border: "1px solid oklch(0.88 0.02 60)" }}
              data-ocid="payment.emi.card"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.18 65), oklch(0.75 0.15 65))",
                    }}
                  >
                    <CreditCard
                      className="w-5 h-5"
                      style={{ color: "oklch(0.11 0.02 45)" }}
                    />
                  </div>
                  <div>
                    <h2
                      className="font-display font-semibold"
                      style={{ color: "oklch(0.18 0.03 45)" }}
                    >
                      EMI Option
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Very helpful if you want to pay in installments / by card
                    </p>
                  </div>
                </div>

                <Separator
                  className="mb-5"
                  style={{ backgroundColor: "oklch(0.88 0.02 60)" }}
                />

                <div className="space-y-4">
                  <div
                    className="p-3 rounded-xl border"
                    style={{
                      background: "oklch(0.65 0.18 65 / 0.06)",
                      borderColor: "oklch(0.65 0.18 65 / 0.2)",
                    }}
                  >
                    <p
                      className="text-xs font-medium mb-1.5"
                      style={{ color: "oklch(0.55 0.2 42)" }}
                    >
                      Payment Link (Razorpay)
                    </p>
                    <p
                      className="font-mono text-sm break-all"
                      style={{ color: "oklch(0.45 0.18 42)" }}
                      data-ocid="payment.razorpay_link"
                    >
                      https://razorpay.me/@nipun3563
                    </p>
                  </div>

                  <a
                    href="https://razorpay.me/@nipun3563"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="payment.razorpay_button"
                  >
                    <Button
                      size="lg"
                      className="w-full font-semibold hover:opacity-90 transition-smooth shadow-md"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.65 0.18 65), oklch(0.75 0.15 65))",
                        color: "oklch(0.11 0.02 45)",
                        border: "none",
                      }}
                    >
                      Pay via Razorpay
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>

                  <div className="grid grid-cols-3 gap-2">
                    {["Credit Card", "Debit Card", "EMI"].map((method) => (
                      <div
                        key={method}
                        className="flex items-center gap-1.5 p-2 rounded-lg border"
                        style={{
                          background: "oklch(0.96 0.01 60)",
                          borderColor: "oklch(0.65 0.18 65 / 0.2)",
                        }}
                      >
                        <CheckCircle2
                          className="w-3.5 h-3.5 flex-shrink-0"
                          style={{ color: "oklch(0.55 0.2 42)" }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {method}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.p
          className="text-center text-xs text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Having trouble? Contact your coach directly for assistance.
        </motion.p>
      </div>
    </div>
  );
}
