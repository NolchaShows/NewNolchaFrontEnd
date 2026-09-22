"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        {/* App Router does not expose status codes; 0 renders a generic message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
