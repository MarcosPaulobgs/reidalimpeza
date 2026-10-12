"use client";

import { useEffect } from "react";

// Anima elementos .reveal quando entram na tela (sutil, uma vez só)
export default function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
  return null;
}
