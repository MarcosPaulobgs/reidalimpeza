"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart, wa } from "@/components/CartProvider";
import { IconCart } from "@/components/Icons";

const NAV = [["servicos", "Serviços"], ["/produtos", "Produtos"], ["sobre", "Sobre nós"], ["localizacao", "Localização"], ["contato", "Contato"]];

export const goTo = (id) => {
  if (id === "topo") window.scrollTo({ top: 0, behavior: "smooth" });
  else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Header() {
  const [menu, setMenu] = useState(false);
  const { count, openCart } = useCart();
  const path = usePathname();
  const router = useRouter();

  // Navega para uma seção sem colocar #seção na URL
  const section = (id) => (e) => {
    e.preventDefault();
    setMenu(false);
    if (path === "/") goTo(id);
    else { try { sessionStorage.setItem("rdl-goto", id); } catch {} router.push("/"); }
  };

  return (
    <header className="header">
      <div className="header-in">
        <Link href="/" className="brand" onClick={(e) => { setMenu(false); if (path === "/") { e.preventDefault(); goTo("topo"); } }}>
          <Image src="/img/logo.webp" alt="" width={52} height={52} className="brand-logo" priority />
          <span>O Rei da Limpeza</span>
        </Link>
        <nav className={`nav ${menu ? "nav-open" : ""}`} aria-label="Principal">
          {NAV.map(([id, t]) => id.startsWith("/")
            ? <Link key={id} href={id} onClick={() => setMenu(false)} className={path === id ? "nav-on" : ""}>{t}</Link>
            : <a key={id} href={`/${id}`} onClick={section(id)}>{t}</a>)}
          <a className="btn btn-gold nav-cta-m" href={wa("Olá! Quero pedir um orçamento de piscina.")} target="_blank" rel="noreferrer">Orçamento de piscina</a>
        </nav>
        <div className="header-actions">
          <a className="btn btn-gold nav-cta" href={wa("Olá! Quero pedir um orçamento de piscina.")} target="_blank" rel="noreferrer">Orçamento de piscina</a>
          <button className="cart-btn" onClick={openCart} aria-label={`Abrir carrinho, ${count} itens`}>
            <IconCart size={22} />{count > 0 && <b key={count}>{count}</b>}
          </button>
          <button className="burger" onClick={() => setMenu(!menu)} aria-label="Abrir menu" aria-expanded={menu}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
