"use client";

import React, { useState } from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "Feedback", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const breadcrumbs = [{ name: "Contact", url: "/contact" }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Contact & Support
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
          Have feedback, found a bug, or want to suggest a new calculator tool? We'd love to hear from you.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Thank You for Reaching Out!</h2>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Your message has been received. Our team will review your feedback and get back to you if necessary.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", subject: "Feedback", message: "" });
                }}
                className="px-4 py-2 text-xs font-semibold text-indigo-600 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Smith"
                  className="w-full px-3 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full px-3 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Inquiry Topic</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Feedback">General Feedback</option>
                  <option value="Bug">Report Calculation Bug</option>
                  <option value="Feature">Suggest a New Calculator</option>
                  <option value="Advertising">Advertising & Partnerships</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Message</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your suggestions or details here..."
                  className="w-full p-3 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Feedback</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Direct Support</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We respond to inquiries regarding calculation discrepancies, school scale requests, and partnership proposals.
            </p>
            <div className="pt-2 text-xs font-mono text-indigo-700 font-semibold">
              support@gradecalculator.click
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2 text-xs text-slate-600">
            <h3 className="font-bold text-slate-900 text-sm">Academic Privacy</h3>
            <p leading-relaxed>
              Please do not send sensitive personal student records or student IDs. Our calculators operate client-side and do not require identification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
