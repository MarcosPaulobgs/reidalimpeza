"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { INSTAGRAM, MAP_LINK } from "@/data/store";
import { wa } from "@/components/CartProvider";
import { goTo } from "@/components/Header";
import { IconWhatsApp, IconInstagram, IconPin } from "@/components/Icons";

export default function Footer() {
  const path = usePathname();
  const router = useRouter();
  const section = (id) => (e) => {
    e.preventDefault();
    if (path === "/") goTo(id);
    else { try { sessionStorage.setItem("rdl-goto", id); } catch {} router.push("/"); }
  };
  return (
    <footer className="footer">
      <div className="footer-in">
        <div className="f-col f-brand">
          <Image src="/img/logo.webp" alt="O Rei da Limpeza" width={96} height={96} className="f-logo" />
          <p>Um novo conceito em limpeza. Limpeza de piscina e loja de produtos de limpeza em Santa Inês e região.</p>
        </div>
        <nav className="f-col" aria-label="Rodapé">
          <h4>Navegação</h4>
          <a href="/topo" onClick={section("topo")}>Início</a>
          <a href="/servicos" onClick={section("servicos")}>Limpeza de piscina</a>
          <Link href="/produtos">Produtos</Link>
          <a href="/sobre" onClick={section("sobre")}>Sobre nós</a>
          <a href="/localizacao" onClick={section("localizacao")}>Localização</a>
        </nav>
        <div className="f-col">
          <h4>Contato</h4>
          <a className="f-line" href={wa("Olá! Vim pelo site.")} target="_blank" rel="noreferrer"><IconWhatsApp size={18} />(73) 98899-8209</a>
          <a className="f-line" href={INSTAGRAM} target="_blank" rel="noreferrer"><IconInstagram size={18} />Instagram</a>
          <a className="f-line" href={MAP_LINK} target="_blank" rel="noreferrer"><IconPin size={18} />Santa Inês - BA</a>
          <a className="btn btn-wa btn-sm f-cta" href={wa("Olá! Quero pedir um orçamento de piscina.")} target="_blank" rel="noreferrer">Pedir orçamento</a>
        </div>
      </div>
      <div className="footer-bot">© {new Date().getFullYear()} O Rei da Limpeza. Todos os direitos reservados.</div>
    </footer>
  );
}
