import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ArrowLeft, ScrollText } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

const sections = [
  {
    title: "Acceptance of Terms",
    content: null,
    bullets: null,
    paragraphs: [
      "By enrolling in the Trained By Nipun Transformation Program and submitting the lead form, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree, please do not proceed with enrollment.",
      "By enrolling in Team Trained By Nipun (Team-TBN), you acknowledge that you have read, understood, and agreed to all the terms mentioned below. This agreement becomes effective immediately upon payment confirmation.",
    ],
  },
  {
    title: "Program Overview",
    content: "Your coaching program includes:",
    bullets: [
      "App Access (TGO)",
      "Personalised Nutrition Plan",
      "Customised Workout Plan",
      "Daily Guidance, Support & Accountability from 2 Dedicated Coaches",
      "Progress Tracking & Review Calls",
    ],
    paragraphs: null,
    subTitle: "TGO App Disclaimer",
    subContent:
      "Please note that we do not own the TGO App. We have subscribed to the TGO App in order to provide app-based services to our training clients. If the app experiences glitches, technical issues, downtime, or any other faults, Team-TBN shall not be held responsible. In such cases, Team-TBN will make reasonable efforts to resolve the issue or provide alternative support through PDF plans or other available resources. However, such issues shall not be considered the responsibility or fault of Team-TBN, as we are users of the app and do not own or control the platform.",
  },
  {
    title: "Commitment to the Program",
    content: null,
    bullets: null,
    paragraphs: [
      "You commit to following the guidelines provided by the coach and team, including recommended workout routines, nutrition plans, and lifestyle instructions, to the best of your ability.",
      "To achieve the best results, you are expected to follow the prescribed nutrition and workout plans, respond to coach communications in a timely manner, attend scheduled review calls, and provide accurate progress data.",
      "Results vary based on individual commitment, consistency, and adherence to the program.",
    ],
  },
  {
    title: "Payment Policy",
    content: null,
    bullets: [
      "Full or partial payment must be made before program activation.",
      "All payments are final and non-refundable.",
      "Failure to complete payment (if on an installment plan) may result in a hold on services.",
    ],
    paragraphs: null,
  },
  {
    title: "Pause & Transfer Policy",
    content: null,
    bullets: [
      "Pause Option: You may pause your plan for personal reasons and resume it later.",
      "Transfer Option: You are allowed to transfer your plan to a known person.",
      "The program validity will remain aligned with the duration originally purchased.",
    ],
    paragraphs: null,
  },
  {
    title: "Payment & Refund Policy",
    content: null,
    bullets: [
      "Change of mind",
      "Lack of time or motivation",
      "Perceived lack of results",
      "Failure to follow the provided guidance",
      "Dissatisfaction arising from non-compliance with the program",
      "Personal schedule changes",
      "Relocation, travel, or work commitments",
      "Medical restrictions arising after enrollment",
      "Any other reason whatsoever",
    ],
    paragraphs: [
      "Program fees are due in full (or through agreed installments) prior to or at the commencement of the program. All payments are non-refundable. By proceeding to the payment portal, you agree to the stated program fee.",
      "Once a purchase is made, it is strictly non-refundable.",
      "Due to the digital nature of our services and the immediate access provided to coaching support, systems, and materials, refunds cannot be offered under any circumstances, including the cases listed below:",
    ],
    trailingText:
      "All payments are final and non-reversible, regardless of the program duration purchased or the length of time the services have been accessed.",
  },
  {
    title: "Client Commitment",
    content: "To achieve the best results, you agree to:",
    bullets: [
      "Follow the plan with discipline and consistency",
      "Submit regular progress updates",
      "Communicate honestly and actively",
      "Respect coach guidance and the process",
    ],
    paragraphs: null,
    trailingText:
      "Important: Results are directly proportional to your consistency, effort, and adherence to the program.",
  },
  {
    title: "Health & Safety Disclaimer",
    content: null,
    bullets: [
      "You confirm that you are physically fit to participate in a fitness program.",
      "If you have any medical condition, prior consultation with a doctor is recommended.",
      "Team-TBN shall not be held responsible for any injuries, health issues, or complications.",
    ],
    paragraphs: [
      "The client understands that participation in the program involves physical activity and voluntarily assumes all associated risks. The client agrees to waive, release, and discharge the coach and team from any claims, injuries, losses, or damages arising from participation in the program.",
      "Trained By Nipun is not liable for any health-related issues arising from participation in the program.",
    ],
  },
  {
    title: "Code of Conduct",
    content: null,
    bullets: null,
    paragraphs: [
      "Any abusive, disrespectful, threatening, defamatory, harassing, or inappropriate behaviour toward the coach or team will result in immediate termination of the program without any refund.",
    ],
  },
  {
    title: "Intellectual Property",
    content: null,
    bullets: [
      "All plans, content, and materials are the property of Team-TBN.",
      "Sharing, reselling, copying, reproducing, or distributing any content is strictly prohibited.",
    ],
    paragraphs: [
      "All materials provided, including nutrition plans, workout plans, educational resources, videos, templates, and program content, are the intellectual property of Trained By Nipun. You may not reproduce, distribute, publish, share, or provide these materials to any third party without prior written consent.",
    ],
  },
  {
    title: "Privacy & Data",
    content: null,
    bullets: null,
    paragraphs: [
      "Your personal information (including name, phone number, email address, and health data) is collected solely for the purpose of delivering the program and communicating with you.",
      "Your data will not be sold or shared with third parties except where required by law.",
      "By enrolling, you consent to receiving program-related communications via WhatsApp, email, phone calls, SMS, or any other communication channel used by Team-TBN.",
    ],
  },
  {
    title: "Communication Guidelines",
    content: null,
    bullets: [
      "Primary communication channel: WhatsApp",
      "Response time: Within working hours (usually within 24 hours)",
      "Any disrespectful or inappropriate behaviour will lead to immediate termination.",
    ],
    paragraphs: null,
  },
  {
    title: "Results Disclaimer",
    content: null,
    bullets: [
      "This is a coaching and guidance-based program.",
      "No guaranteed results are promised.",
      "Liability is limited to the amount paid for the program only.",
    ],
    paragraphs: [
      "Our team will make every reasonable effort to provide you with the best possible support and guidance.",
      "However, the client understands that results depend entirely on their personal effort, consistency, discipline, lifestyle habits, genetics, medical condition, and adherence to the program.",
    ],
  },
  {
    title: "Termination Policy",
    content:
      "Team-TBN reserves the right to terminate services without refund if:",
    bullets: [
      "These terms are violated",
      "Misconduct or abusive behaviour occurs",
      "Program misuse is detected",
      "Content sharing or unauthorized distribution of materials is detected",
      "False or misleading information is provided by the client",
    ],
    paragraphs: null,
  },
  {
    title: "Final Consent",
    content: "By enrolling in this program, you confirm that:",
    bullets: [
      "✔ You understand this is a results-based effort program and not a guarantee of results.",
      "✔ You agree to follow all terms mentioned above.",
      "✔ You take full responsibility for your participation and results.",
    ],
    paragraphs: null,
  },
  {
    title: "Acceptance of Terms",
    content: null,
    bullets: null,
    paragraphs: [
      "By proceeding with the payment, you confirm that you have read, understood, and agree to all the above Terms and Conditions.",
      "You further acknowledge that you have had sufficient opportunity to review these Terms and Conditions, understand your rights and obligations, and voluntarily agree to be bound by them.",
    ],
  },
];

function buildPdfLines(): { text: string; isHeading: boolean }[] {
  const lines: { text: string; isHeading: boolean }[] = [];
  lines.push({
    text: "TEAM TRAINEDBYNIPUN – CLIENT AGREEMENT & TERMS",
    isHeading: true,
  });
  lines.push({ text: "Last Updated: June 2026", isHeading: false });
  lines.push({ text: "", isHeading: false });
  for (const section of sections) {
    lines.push({ text: section.title.toUpperCase(), isHeading: true });
    if (section.content)
      lines.push({ text: section.content, isHeading: false });
    if (section.paragraphs) {
      for (const p of section.paragraphs)
        lines.push({ text: p, isHeading: false });
    }
    if (section.bullets) {
      for (const b of section.bullets)
        lines.push({ text: `  • ${b}`, isHeading: false });
    }
    if ("subTitle" in section && section.subTitle) {
      lines.push({ text: section.subTitle, isHeading: true });
      if ("subContent" in section && section.subContent)
        lines.push({ text: section.subContent as string, isHeading: false });
    }
    if ("trailingText" in section && section.trailingText) {
      lines.push({ text: section.trailingText as string, isHeading: false });
    }
    lines.push({ text: "", isHeading: false });
  }
  return lines;
}

export default function TermsPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const el = contentRef.current;
    if (!el) return;

    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0d0d0d",
        logging: false,
        windowWidth: el.scrollWidth,
        windowHeight: el.scrollHeight,
      });

      // imgData is not used directly; slices are generated per page below
      const doc = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      });

      const pageW = 210; // A4 width mm
      const pageH = 297; // A4 height mm
      const margin = 0;

      const imgW = pageW - margin * 2;
      const ratio = canvas.height / canvas.width;
      const totalImgH = imgW * ratio;

      let remainingH = totalImgH;
      let srcY = 0;
      let pageNum = 0;

      while (remainingH > 0) {
        const sliceH = Math.min(remainingH, pageH);
        // srcY in canvas pixels
        const srcYPx = (srcY / totalImgH) * canvas.height;
        const sliceHPx = (sliceH / totalImgH) * canvas.height;

        // Create a slice canvas
        const slice = document.createElement("canvas");
        slice.width = canvas.width;
        slice.height = Math.ceil(sliceHPx);
        const ctx = slice.getContext("2d");
        if (ctx) {
          ctx.drawImage(canvas, 0, -srcYPx);
        }
        const sliceData = slice.toDataURL("image/jpeg", 0.95);

        if (pageNum > 0) doc.addPage();
        doc.addImage(sliceData, "JPEG", margin, 0, imgW, sliceH);

        srcY += sliceH;
        remainingH -= sliceH;
        pageNum++;
      }

      doc.save("TrainedByNipun-Terms-and-Conditions.pdf");
    } catch {
      // Fallback: styled jsPDF text version
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      const pageHmm = doc.internal.pageSize.getHeight();
      const margin = 16;
      const maxW = pageW - margin * 2;
      let y = 20;
      const lineH = 5.5;
      const headingH = 6.5;

      // Dark background
      doc.setFillColor(17, 17, 17);
      doc.rect(0, 0, pageW, pageHmm, "F");

      const addText = (text: string, isHeading: boolean) => {
        if (text === "") {
          y += 3;
          return;
        }
        doc.setFont("helvetica", isHeading ? "bold" : "normal");
        doc.setFontSize(isHeading ? 10 : 9);
        if (isHeading) doc.setTextColor(212, 175, 55);
        else doc.setTextColor(220, 220, 220);
        const wrapped = doc.splitTextToSize(text, maxW) as string[];
        const blockH = wrapped.length * (isHeading ? headingH : lineH);
        if (y + blockH > pageHmm - 16) {
          doc.addPage();
          doc.setFillColor(17, 17, 17);
          doc.rect(0, 0, pageW, pageHmm, "F");
          y = 20;
        }
        doc.text(wrapped, margin, y);
        y += blockH;
      };

      for (const line of buildPdfLines()) addText(line.text, line.isHeading);
      doc.save("TrainedByNipun-Terms-and-Conditions.pdf");
    }
  };

  return (
    <div className="py-12 bg-background" data-ocid="terms.page">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          className="terms-no-print"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-colors duration-200 mb-8"
            style={{ color: "oklch(0.55 0.2 42)" }}
            data-ocid="terms.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Program
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div
            className="rounded-2xl p-6 sm:p-8 mb-6 border relative"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.11 0.02 45) 0%, oklch(0.18 0.04 50) 100%)",
              borderColor: "oklch(0.65 0.18 65 / 0.3)",
            }}
          >
            {/* Tiny download button — top-right corner */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              data-ocid="terms.download_pdf_button"
              title="Download PDF"
              className="absolute top-3 right-3 text-xs px-1.5 py-0.5 rounded opacity-40 hover:opacity-80 transition-opacity duration-200 leading-none"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              ⬇️
            </button>
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.18 65), oklch(0.75 0.15 65))",
                }}
              >
                <ScrollText
                  className="w-6 h-6"
                  style={{ color: "oklch(0.11 0.02 45)" }}
                />
              </div>
              <div>
                <h1
                  className="font-display text-2xl sm:text-3xl font-bold"
                  style={{ color: "oklch(0.65 0.18 65)" }}
                >
                  Terms &amp; Conditions
                </h1>
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.7 0.04 60)" }}
                >
                  TEAM TRAINEDBYNIPUN – CLIENT AGREEMENT & TERMS
                </p>
              </div>
            </div>
            <p
              className="text-sm mt-4 leading-relaxed"
              style={{ color: "oklch(0.75 0.03 60)" }}
            >
              Please read these Terms and Conditions carefully before enrolling
              in the Trained By Nipun Transformation Program. Last Updated: June
              2026.
            </p>
          </div>
        </motion.div>

        {/* Capturable content region */}
        <div ref={contentRef}>
          {/* Sections */}
          <div className="space-y-4">
            {sections.map((section, i) => (
              <motion.div
                key={`${section.title}-${i}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: "easeOut" }}
                data-ocid={`terms.section.${i + 1}`}
              >
                <Card
                  className="bg-card border shadow-sm hover:shadow-md transition-shadow duration-200"
                  style={{ borderColor: "oklch(0.88 0.02 60)" }}
                >
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.65 0.18 65), oklch(0.75 0.15 65))",
                          color: "oklch(0.11 0.02 45)",
                        }}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2
                          className="font-display font-semibold mb-2"
                          style={{ color: "oklch(0.18 0.03 45)" }}
                        >
                          {section.title}
                        </h2>

                        {/* Opening paragraphs before bullets */}
                        {section.paragraphs &&
                          !section.bullets &&
                          section.paragraphs.map((p) => (
                            <p
                              key={p.slice(0, 40)}
                              className="text-sm text-muted-foreground leading-relaxed mb-2"
                            >
                              {p}
                            </p>
                          ))}

                        {/* Paragraphs before bullets (for mixed sections) */}
                        {section.paragraphs &&
                          section.bullets &&
                          section.paragraphs.map((p) => (
                            <p
                              key={p.slice(0, 40)}
                              className="text-sm text-muted-foreground leading-relaxed mb-2"
                            >
                              {p}
                            </p>
                          ))}

                        {/* Intro text before bullet list */}
                        {section.content && (
                          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                            {section.content}
                          </p>
                        )}

                        {/* Bullet list */}
                        {section.bullets && (
                          <ul className="space-y-1 mb-2">
                            {section.bullets.map((b) => (
                              <li
                                key={b.slice(0, 40)}
                                className="text-sm text-muted-foreground flex items-start gap-2"
                              >
                                <span
                                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{ background: "oklch(0.65 0.18 65)" }}
                                />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Sub-section (TGO disclaimer) */}
                        {"subTitle" in section && section.subTitle && (
                          <div
                            className="mt-3 p-3 rounded-lg border-l-2"
                            style={{
                              background: "oklch(0.97 0.01 60)",
                              borderColor: "oklch(0.65 0.18 65 / 0.5)",
                            }}
                          >
                            <p
                              className="text-xs font-semibold mb-1"
                              style={{ color: "oklch(0.45 0.15 55)" }}
                            >
                              {section.subTitle}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {"subContent" in section
                                ? section.subContent
                                : ""}
                            </p>
                          </div>
                        )}

                        {/* Trailing text after bullets */}
                        {"trailingText" in section && section.trailingText && (
                          <p className="text-sm text-muted-foreground leading-relaxed mt-2 font-medium">
                            {section.trailingText}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Return CTA */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div
            className="rounded-2xl p-6 border"
            style={{
              background: "oklch(0.98 0.008 60)",
              borderColor: "oklch(0.65 0.18 65 / 0.2)",
            }}
          >
            <p className="text-sm text-muted-foreground mb-4">
              By returning to the enrollment form and checking the box, you
              confirm you have read and accepted these terms.
            </p>
            <Link to="/" data-ocid="terms.return_button">
              <Button
                size="lg"
                className="font-semibold hover:opacity-90 transition-smooth shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.18 65), oklch(0.75 0.15 65))",
                  color: "oklch(0.11 0.02 45)",
                  border: "none",
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Enrollment Form
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
