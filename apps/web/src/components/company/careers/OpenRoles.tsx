"use client";

import { useEffect, useMemo, useState } from "react";
import { JobModal } from "./JobModal";

const FORMATS = ["Full-time", "Intern", "Remote", "On-site"] as const;

type Opening = {
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
};

type Department = {
  name: string;
  description: string;
  openings: Opening[];
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

type OpenRolesProps = {
  heading: string;
  description: string;
  emptyText: string;
  departments: Department[];
  applyForm: ApplyForm;
};

export function OpenRoles({ heading, description, emptyText, departments, applyForm }: OpenRolesProps) {
  const [expandedDept, setExpandedDept] = useState<number | null>(null);
  const [selectedJob, setSelectedJob] = useState<(Opening & { department: string }) | null>(null);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [format, setFormat] = useState<string>("all");

  // Pre-select format from URL (?type=Intern) — nav "Internships" link
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    if (!t) return;
    const match = FORMATS.find((f) => f.toLowerCase() === t.toLowerCase());
    if (!match) return;
    const raf = requestAnimationFrame(() => setFormat(match));
    return () => cancelAnimationFrame(raf);
  }, []);

  const filteredDepts = useMemo(() => {
    return departments
      .map((dept) => {
        const q = search.toLowerCase();
        const fmt = format.toLowerCase();
        const matchesFilter = filterDept === "all" || dept.name === filterDept;
        const filtered = dept.openings.filter(
          (job) =>
            matchesFilter &&
            (fmt === "all" ||
              job.type.toLowerCase().includes(fmt) ||
              job.location.toLowerCase().includes(fmt)) &&
            (q === "" ||
              job.title.toLowerCase().includes(q) ||
              job.location.toLowerCase().includes(q) ||
              dept.name.toLowerCase().includes(q))
        );
        return { ...dept, openings: filtered };
      })
      .filter((dept) => dept.openings.length > 0);
  }, [departments, search, filterDept, format]);

  return (
    <>
      <section id="roles" className="pt-0 pb-0 scroll-mt-24">
        <div className="border-neutral-200 border-b">
          <div className="w-full relative bg-neutral-900 text-white">
            <div className="px-4 md:px-10 lg:px-20 py-10 md:py-20 lg:py-30">
              {/* Header row: title left, search + filter right */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <h2 className="text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
                  {heading}
                </h2>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search..."
                      className="pl-9 pr-3 py-2 w-40 bg-neutral-800 border border-neutral-700 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#c45824]/40 focus:border-[#c45824] transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 1.343-9 3s4.03 3 9 3 9-1.343 9-3-4.03-3-9-3zM3 6v6l6 3v6h6v-6l6-3V6" />
                    </svg>
                    <select
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      aria-label="Filter by role format"
                      className={`pl-8 pr-3 py-2 w-32 appearance-none cursor-pointer bg-neutral-800 border rounded-lg text-xs transition-colors focus:outline-none focus:ring-1 focus:ring-[#c45824]/40 ${
                        format === "all"
                          ? "text-white placeholder-neutral-500 border-neutral-700"
                          : "text-[#ff8a5c] border-[#c45824]"
                      }`}
                    >
                      <option value="all">All formats</option>
                      {FORMATS.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                  <select
                    value={filterDept}
                    onChange={(e) => setFilterDept(e.target.value)}
                    className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#c45824]/40 focus:border-[#c45824] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="all">All</option>
                    {departments.map((dept) => (
                      <option key={dept.name} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-lg text-neutral-400 mb-10 max-w-2xl">
                {description}
              </p>

              {/* Departments */}
              {filteredDepts.length === 0 ? (
                <p className="text-lg text-neutral-500">{emptyText}</p>
              ) : (
                <div className="space-y-4">
                  {filteredDepts.map((dept, idx) => {
                    const isExpanded = expandedDept === idx;
                    return (
                      <div key={dept.name} className="border border-neutral-700 rounded-2xl overflow-hidden">
                        {/* Department header */}
                        <button
                          onClick={() => setExpandedDept((prev) => (prev === idx ? null : idx))}
                          className="w-full flex items-center justify-between px-6 md:px-8 py-5 text-left hover:bg-neutral-800 transition-colors group"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`size-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${
                              isExpanded ? "bg-[#c45824] text-white" : "bg-neutral-800 text-neutral-400 group-hover:bg-[#c45824] group-hover:text-white"
                            }`}>
                              {dept.openings.length}
                            </div>
                            <div>
                              <h3 className="text-lg md:text-xl font-medium text-white group-hover:text-[#c45824] transition-colors">
                                {dept.name}
                              </h3>
                              <p className="text-sm text-neutral-500">{dept.description}</p>
                            </div>
                          </div>
                          <svg className={`w-5 h-5 text-neutral-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </button>

                        {/* Job list */}
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isExpanded ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
                        }`}>
                          <div className="px-6 md:px-8 pb-6 space-y-3">
                            {dept.openings.map((job) => (
                              <button
                                key={job.title}
                                onClick={() => setSelectedJob({ ...job, department: dept.name })}
                                className="w-full flex items-center justify-between p-5 bg-neutral-800/50 border border-neutral-700 rounded-xl text-left hover:border-[#c45824] hover:bg-neutral-800 transition-all group"
                              >
                                <div className="flex flex-col gap-1.5">
                                  <h4 className="text-base md:text-lg font-medium text-white group-hover:text-[#c45824] transition-colors">
                                    {job.title}
                                  </h4>
                                  <div className="flex items-center gap-3 text-sm text-neutral-500">
                                    <span className="flex items-center gap-1">
                                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                      </svg>
                                      {job.location}
                                    </span>
                                    <span className="text-neutral-700">|</span>
                                    <span>{job.type}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs font-medium text-[#c45824] opacity-0 group-hover:opacity-100 transition-opacity">Apply →</span>
                                  <svg className="w-5 h-5 text-neutral-600 group-hover:text-[#c45824] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                  </svg>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedJob && (
        <JobModal
          job={selectedJob}
          form={applyForm}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </>
  );
}
