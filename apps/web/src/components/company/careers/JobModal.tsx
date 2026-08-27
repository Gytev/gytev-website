"use client";

import { useState, useRef } from "react";

type Job = {
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  department: string;
};

type ApplyForm = {
  modalTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  linkedinLabel: string;
  linkedinPlaceholder: string;
  cvLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  sendingLabel: string;
  successLabel: string;
  errorLabel: string;
  closeLabel: string;
};

type JobModalProps = {
  job: Job;
  form: ApplyForm;
  onClose: () => void;
};

export function JobModal({ job, form, onClose }: JobModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File too large. Max 10MB.");
        return;
      }
      setCvFile(file);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const formData = new FormData();
      formData.append("topic", "jobs");
      formData.append("email", email);
      formData.append("firstname", name.split(" ")[0]);
      formData.append("lastname", name.split(" ").slice(1).join(" "));
      formData.append("role", `${job.title} — ${job.department}`);
      formData.append("message", [
        `Position: ${job.title}`,
        `Department: ${job.department}`,
        `Location: ${job.location}`,
        `Type: ${job.type}`,
        "",
        phone && `Phone: ${phone}`,
        linkedin && `LinkedIn: ${linkedin}`,
        "",
        "Cover letter:",
        message,
      ].filter(Boolean).join("\n"));

      if (cvFile) {
        formData.append("cv", cvFile);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/jobs/apply`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative bg-[#141416] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#141416] border-b border-[rgba(255,255,255,0.08)] px-6 md:px-8 py-5 flex items-start justify-between z-10 rounded-t-2xl">
          <div>
            <h3 className="text-xl font-medium text-[#f0ede8]">{form.modalTitle}</h3>
            <p className="text-sm text-[#c45824] font-medium mt-1">{job.title}</p>
            <div className="flex items-center gap-3 text-xs text-[#888] mt-2">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {job.location}
              </span>
              <span className="text-[rgba(255,255,255,0.15)]">|</span>
              <span>{job.type}</span>
              <span className="text-[rgba(255,255,255,0.15)]">|</span>
              <span>{job.department}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-9 flex items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.08)] transition-colors shrink-0 ml-4"
          >
            <svg className="w-5 h-5 text-[#888]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {status === "success" ? (
          <div className="px-6 md:px-8 py-16 text-center">
            <div className="size-16 mx-auto mb-6 rounded-full bg-[rgba(16,185,129,0.15)] flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-lg font-medium text-[#f0ede8] mb-2">{form.successLabel}</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 bg-[#f0ede8] text-[#0a0a0b] text-sm font-medium rounded-full hover:bg-white transition-colors"
            >
              {form.closeLabel}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 md:px-8 py-6 space-y-5">
            {/* Job description */}
            <div className="bg-[#111113] rounded-xl p-5 mb-2">
              <h4 className="text-sm font-semibold text-[#f0ede8] mb-2">About this role</h4>
              <p className="text-sm text-[#999] leading-relaxed mb-4">{job.description}</p>
              {job.requirements.length > 0 && (
                <>
                  <h4 className="text-sm font-semibold text-[#f0ede8] mb-2">Requirements</h4>
                  <ul className="space-y-1.5">
                    {job.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2 text-sm text-[#999]">
                        <span className="text-[#c45824] mt-1 shrink-0">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#ccc] mb-1.5">{form.nameLabel}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={form.namePlaceholder}
                className="w-full px-4 py-2.5 border border-[rgba(255,255,255,0.08)] rounded-xl text-sm text-[#f0ede8] bg-[#111113] focus:outline-none focus:ring-2 focus:ring-[#c45824]/20 focus:border-[#c45824] transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#ccc] mb-1.5">{form.emailLabel}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={form.emailPlaceholder}
                className="w-full px-4 py-2.5 border border-[rgba(255,255,255,0.08)] rounded-xl text-sm text-[#f0ede8] bg-[#111113] focus:outline-none focus:ring-2 focus:ring-[#c45824]/20 focus:border-[#c45824] transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[#ccc] mb-1.5">{form.phoneLabel}</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={form.phonePlaceholder}
                className="w-full px-4 py-2.5 border border-[rgba(255,255,255,0.08)] rounded-xl text-sm text-[#f0ede8] bg-[#111113] focus:outline-none focus:ring-2 focus:ring-[#c45824]/20 focus:border-[#c45824] transition-colors"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-[#ccc] mb-1.5">{form.linkedinLabel}</label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder={form.linkedinPlaceholder}
                className="w-full px-4 py-2.5 border border-[rgba(255,255,255,0.08)] rounded-xl text-sm text-[#f0ede8] bg-[#111113] focus:outline-none focus:ring-2 focus:ring-[#c45824]/20 focus:border-[#c45824] transition-colors"
              />
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium text-[#ccc] mb-1.5">{form.cvLabel}</label>
              <div
                onClick={() => fileRef.current?.click()}
                className="w-full px-4 py-4 border-2 border-dashed border-[rgba(255,255,255,0.12)] rounded-xl text-sm cursor-pointer hover:border-[#c45824] hover:bg-[rgba(255,255,255,0.03)] transition-colors text-center"
              >
                {cvFile ? (
                  <div className="flex items-center justify-center gap-2 text-[#f0ede8]">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="font-medium">{cvFile.name}</span>
                    <span className="text-[#888]">({(cvFile.size / 1024 / 1024).toFixed(1)} MB)</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-[#888]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <span>Click to upload CV (PDF, max 10MB)</span>
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-[#ccc] mb-1.5">{form.messageLabel}</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={form.messagePlaceholder}
                className="w-full px-4 py-2.5 border border-[rgba(255,255,255,0.08)] rounded-xl text-sm text-[#f0ede8] bg-[#111113] focus:outline-none focus:ring-2 focus:ring-[#c45824]/20 focus:border-[#c45824] transition-colors resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-400">{form.errorLabel}</p>
            )}

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-medium text-[#888] hover:text-[#f0ede8] transition-colors"
              >
                {form.closeLabel}
              </button>
              <button
                type="submit"
                disabled={status === "sending"}
                className="px-6 py-2.5 bg-[#c45824] text-white text-sm font-medium rounded-full hover:bg-[#a84420] transition-colors disabled:opacity-50"
              >
                {status === "sending" ? form.sendingLabel : form.submitLabel}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
