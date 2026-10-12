"use client";

import { useEffect, useState } from "react";
import { wa } from "@/components/CartProvider";
import { IconWhatsApp } from "@/components/Icons";

// Só aparece depois de rolar a página
export default function WaFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 320);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <a className={`wa-float ${show ? "wa-show" : ""}`} href={wa("Olá! Vim pelo site.")} target="_blank" rel="noreferrer" tabIndex={show ? 0 : -1} aria-label="Chamar no WhatsApp">
      <span className="wa-bob"><IconWhatsApp size={30} /></span>
    </a>
  );
}
