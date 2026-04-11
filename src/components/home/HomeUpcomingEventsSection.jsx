"use client";

import { useCallback, useEffect, useState } from "react";
import UpcomingEventsList from "@/components/home/UpcomingEventsList";
import { upcomingListEvents } from "@/data/upcomingEvents";

export default function HomeUpcomingEventsSection({
  title = "Upcoming Events",
  events = upcomingListEvents,
}) {
  const [requestedUpcomingSlug, setRequestedUpcomingSlug] = useState(null);

  const handleUpcomingEventHandled = useCallback(() => {
    if (typeof window === "undefined" || !requestedUpcomingSlug) return;

    const nextParams = new URLSearchParams(window.location.search);
    nextParams.delete("upcoming");

    const nextUrl = nextParams.toString()
      ? `${window.location.pathname}?${nextParams.toString()}`
      : window.location.pathname;

    try {
      window.sessionStorage.removeItem("nolcha:open-upcoming");
    } catch (error) {
      console.error("Failed to clear upcoming event selection:", error);
    }

    window.history.replaceState({}, "", nextUrl);
    setRequestedUpcomingSlug(null);
  }, [requestedUpcomingSlug]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncUpcomingSlug = (incomingSlug = null) => {
      if (incomingSlug) {
        setRequestedUpcomingSlug(incomingSlug);
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const slugFromQuery = params.get("upcoming");

      if (slugFromQuery) {
        setRequestedUpcomingSlug(slugFromQuery);
        return;
      }

      try {
        const storedSlug = window.sessionStorage.getItem("nolcha:open-upcoming");
        setRequestedUpcomingSlug(storedSlug || null);
      } catch (error) {
        console.error("Failed to read upcoming event selection:", error);
        setRequestedUpcomingSlug(null);
      }
    };

    const handlePopState = () => syncUpcomingSlug();
    const handleUpcomingSelection = (event) =>
      syncUpcomingSlug(event?.detail?.slug || null);

    syncUpcomingSlug();
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("nolcha:open-upcoming", handleUpcomingSelection);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("nolcha:open-upcoming", handleUpcomingSelection);
    };
  }, []);

  return (
    <UpcomingEventsList
      title={title}
      events={events}
      openEventSlug={requestedUpcomingSlug}
      onOpenEventHandled={handleUpcomingEventHandled}
    />
  );
}
