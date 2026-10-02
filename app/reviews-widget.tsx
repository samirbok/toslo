"use client";

import { useEffect, useRef, useState } from "react";

export default function ReviewsWidget({ title }: { title: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(400);

  useEffect(() => {
    function resize(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type !== "toslo-reviews-height" || !Number.isFinite(event.data.height)) return;
      setHeight(Math.min(2400, Math.max(320, Math.ceil(event.data.height))));
    }
    window.addEventListener("message", resize);
    return () => window.removeEventListener("message", resize);
  }, []);

  // Elfsight owns its style tags; keep them outside React's managed document.
  return <iframe ref={frame} src="/reviews-widget.html" title={title} loading="lazy" className="mt-8 block w-full border-0" style={{ height }} />;
}
