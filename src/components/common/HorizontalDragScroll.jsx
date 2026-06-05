"use client";

import { useEffect, useRef } from "react";

/** Horizontal scroll row with mouse drag on desktop; native touch scroll on mobile. */
export default function HorizontalDragScroll({ className = "", style, children }) {
  const scrollRef = useRef(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startScroll: 0,
    dragged: false,
  });
  const suppressLinkClickRef = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current.active) return;
      const el = scrollRef.current;
      if (!el) return;
      const dx = e.clientX - dragRef.current.startX;
      if (Math.abs(dx) > 6) {
        dragRef.current.dragged = true;
      }
      el.scrollLeft = dragRef.current.startScroll - dx;
    };

    const onUp = () => {
      if (!dragRef.current.active) return;
      const wasDrag = dragRef.current.dragged;
      dragRef.current.active = false;
      dragRef.current.dragged = false;
      if (wasDrag) {
        suppressLinkClickRef.current = true;
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    const el = scrollRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      dragged: false,
    };
    e.preventDefault();
  };

  const onClickCapture = (e) => {
    if (!suppressLinkClickRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    suppressLinkClickRef.current = false;
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={onMouseDown}
      onClickCapture={onClickCapture}
      className={`flex cursor-grab overflow-x-auto pb-1 scrollbar-hide select-none active:cursor-grabbing ${className}`}
      style={{ WebkitOverflowScrolling: "touch", ...style }}
    >
      {children}
    </div>
  );
}
