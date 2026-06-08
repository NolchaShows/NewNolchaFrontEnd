"use client";

import { useEffect, useRef, useState } from "react";
import { subscribeToModalCloseEvent } from "@/lib/modalEvents";
import { useLenis } from "@/components/common/SmoothScroll";

const INQUIRY_TYPE_OPTIONS = [
  "White Label",
  "Sponsorship",
  "Co-Hosting",
  "Conference",
  "Institutional Event",
  "General Inquiry",
  "Tiktok Brand Marketing",
];

const BUDGET_RANGE_OPTIONS = ["Under $15K", "$15K–$50k", "$50K+"];

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://new-nolcha-strapi-uiai.onrender.com";

const SELECT_CHEVRON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%231a1a1a' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;

function RequiredLabel({ children }) {
  return (
    <label className="mb-1.5 block text-[13px] text-[#1a1a1a]">
      <span className="text-[#e53935]">* </span>
      {children}
    </label>
  );
}

function FieldLabel({ children }) {
  return (
    <label className="mb-1.5 block text-[13px] text-[#1a1a1a]">{children}</label>
  );
}

const fieldClass =
  "h-10 w-full border border-[#cfcfcf] bg-white px-3 text-[14px] text-[#1a1a1a] placeholder:text-[#9a9a9a] focus:border-[#1a1a1a] focus:outline-none";

const selectClass = `${fieldClass} appearance-none bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-10`;

function splitName(fullName) {
  const trimmed = fullName.trim();
  if (!trimmed) return { firstName: "", lastName: "" };
  const parts = trimmed.split(/\s+/);
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ") || "—",
  };
}

export default function LetsChatModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "",
    budgetRange: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const lenis = useLenis();
  const panelRef = useRef(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!isOpen) return;

    scrollYRef.current = window.scrollY;
    lenis?.stop();

    const { body, documentElement: html } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyWidth = body.style.width;
    const prevHtmlOverflow = html.style.overflow;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.width = "100%";

    return () => {
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.width = prevBodyWidth;
      html.style.overflow = prevHtmlOverflow;
      window.scrollTo(0, scrollYRef.current);
      lenis?.start();
    };
  }, [isOpen, lenis]);

  const handlePanelWheel = (event) => {
    event.stopPropagation();

    const panel = panelRef.current;
    if (!panel) return;

    const { scrollTop, scrollHeight, clientHeight } = panel;
    const atTop = scrollTop <= 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

    if ((atTop && event.deltaY < 0) || (atBottom && event.deltaY > 0)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    return subscribeToModalCloseEvent(onClose);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError("");
    setIsSuccess(false);

    const { firstName, lastName } = splitName(formData.name);
    const messageBody = [
      formData.message.trim(),
      formData.company.trim() && `Company: ${formData.company.trim()}`,
      formData.inquiryType && `Inquiry Type: ${formData.inquiryType}`,
      formData.budgetRange && `Budget Range: ${formData.budgetRange}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch(`${STRAPI_URL}/api/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          firstName,
          lastName,
          email: formData.email.trim(),
          message: messageBody,
          company: formData.company.trim(),
          companyName: formData.company.trim(),
          inquiryType: formData.inquiryType,
          budgetRange: formData.budgetRange,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        inquiryType: "",
        budgetRange: "",
        message: "",
      });
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overscroll-none bg-black/40 p-4 sm:p-6 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lets-chat-title"
      data-lenis-prevent
      onClick={handleClose}
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-[1080px] flex-col overflow-hidden bg-white shadow-xl lg:flex-row"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#1a1a1a] text-[#1a1a1a] transition-colors hover:bg-[#f5f5f5]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="shrink-0 px-6 pb-6 pt-12 sm:px-10 sm:pt-14 lg:w-[42%] lg:px-14 lg:py-16 lg:pr-8">
          <h2
            id="lets-chat-title"
            className="text-[42px] leading-[1.1] text-[#1a1a1a] sm:text-[52px] lg:text-[58px]"
          >
            Partner With Nolcha
          </h2>
          <p className="mt-8 max-w-[340px] text-[14px] leading-[1.65] text-[#5a5a5a] sm:text-[15px]">
            Strategic partnerships, cultural moments, and high-signal
            experiences.
          </p>
        </div>

        <div
          ref={panelRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-12 sm:px-10 lg:max-h-[92vh] lg:px-14 lg:py-16 lg:pl-0 lg:pr-14"
          data-lenis-prevent
          onWheel={handlePanelWheel}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {isSuccess ? (
            <div className="flex min-h-[360px] flex-col justify-center py-8">
              <p className="text-[18px] font-medium text-[#1a1a1a]">
                Thank you — we&apos;ll be in touch soon.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-8 w-fit border border-[#cfcfcf] px-6 py-2 text-[14px] font-medium text-[#1a1a1a] hover:bg-[#f5f5f5]"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <RequiredLabel>Name</RequiredLabel>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={fieldClass}
                  required
                  autoComplete="name"
                />
              </div>

              <div>
                <RequiredLabel>Email</RequiredLabel>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={fieldClass}
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <RequiredLabel>Company</RequiredLabel>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={fieldClass}
                  required
                  autoComplete="organization"
                />
              </div>

              <div>
                <RequiredLabel>Inquiry Type</RequiredLabel>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className={selectClass}
                  style={{ backgroundImage: SELECT_CHEVRON }}
                  required
                >
                  <option value="">Select…</option>
                  {INQUIRY_TYPE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <RequiredLabel>Budget Range</RequiredLabel>
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className={selectClass}
                  style={{ backgroundImage: SELECT_CHEVRON }}
                  required
                >
                  <option value="">Select…</option>
                  {BUDGET_RANGE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>Message</FieldLabel>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your goals or project."
                  className="min-h-[120px] w-full resize-y border border-[#cfcfcf] bg-white px-3 py-2.5 text-[14px] text-[#1a1a1a] placeholder:text-[#9a9a9a] focus:border-[#1a1a1a] focus:outline-none"
                />
              </div>

              {submitError ? (
                <p className="text-[13px] text-[#e53935]">{submitError}</p>
              ) : null}

              <button
                type="submit"
                disabled={isLoading}
                className="border border-[#cfcfcf] px-6 py-2 text-[14px] font-medium text-[#1a1a1a] transition-colors hover:bg-[#f5f5f5] disabled:opacity-60"
              >
                {isLoading ? "Sending…" : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
