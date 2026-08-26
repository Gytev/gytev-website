"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const TRACK_URL = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/analytics/track`;

function getSessionId(): string {
  try {
    let sid = sessionStorage.getItem("gytev_sid");
    if (!sid) {
      sid =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem("gytev_sid", sid);
    }
    return sid;
  } catch {
    return "anon-session";
  }
}

function getTimezone(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;
  } catch {
    return null;
  }
}

function send(payload: Record<string, unknown>) {
  try {
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    if (navigator.sendBeacon?.(TRACK_URL, blob)) return;
  } catch {
    // ignore
  }
  void fetch(TRACK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => undefined);
}

export function Tracker() {
  const pathname = usePathname();
  const currentPath = useRef(pathname);

  useEffect(() => {
    const sessionId = getSessionId();
    const referrer =
      document.referrer && !document.referrer.includes(window.location.host)
        ? document.referrer
        : null;

    const trackView = (path: string) => {
      send({
        session_id: sessionId,
        event_type: "view",
        path,
        locale: path.split("/")[1] || "en",
        referrer,
        timezone: getTimezone(),
      });
      currentPath.current = path;
    };

    const trackLeave = () => {
      send({
        session_id: sessionId,
        event_type: "leave",
        path: currentPath.current,
        timezone: getTimezone(),
      });
    };

    trackView(pathname);

    const onHide = () => {
      if (document.visibilityState === "hidden") trackLeave();
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", trackLeave);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", trackLeave);
    };
  }, [pathname]);

  return null;
}
