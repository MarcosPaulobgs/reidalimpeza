"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SERVICE, WHATSAPP, INSTAGRAM, MAP_EMBED, MAP_LINK, MAP_ROUTE } from "@/data/store";
import { wa } from "@/components/CartProvider";
import { goTo } from "@/components/Header";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { IconWhatsApp, IconInstagram, IconPool, IconPin } from "@/components/Icons";

export default function Home() {
  // Vindo de outra página: rola até a seção e mantém a URL limpa (sem #)
  useEffect(() => {
    let id; try { id = sessionStorage.getItem("rdl-goto"); sessionStorage.removeItem("rdl-goto"); } catch {}
    if (location.hash) history.replaceState(null, "", location.pathname);
    if (id) setTimeout(() => goTo(id), 120);
    else {
      // Ao abrir/recarregar, sempre começa no topo (hero)
      history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  return (
    <>
      <Reveal />
      <main id="topo">
        <section className="hero">
          {[8, 22, 41, 63, 84].map((l, i) => (
            <i key={l} className="bubble" style={{ left: `${l}%`, "--d": `${9 + i * 2}s`, "--s": `${14 + (i % 3) * 10}px`, animationDelay: `${i * -2.5}s` }} />
          ))}
          <div className="hero-in">
            <div className="hero-text">
              <p className="pill load" style={{ "--i": 0 }}>Atendemos em Santa Inês e toda região</p>
              <h1 className="load" style={{ "--i": 1 }}>Piscina cristalina e produtos de limpeza para o seu dia a dia.</h1>
              <p className="hero-sub load" style={{ "--i": 2 }}>Fazemos a limpeza da sua piscina e vendemos produtos para casa, roupa e carro. Peça orçamento ou monte seu pedido e finalize pelo WhatsApp.</p>
              <div className="hero-btns load" style={{ "--i": 3 }}>
                <a className="btn btn-gold" href={wa("Olá! Quero pedir um orçamento de limpeza de piscina.")} target="_blank" rel="noreferrer">Orçamento de piscina</a>
                <Link className="btn btn-ghost" href="/produtos">Ver produtos</Link>
              </div>
            </div>
            <div className="stage load-pop" aria-hidden="true">
              <div className="float hero-logo"><Image src="/img/logo.webp" alt="" width={320} height={320} className="stage-logo" priority /></div>
              <div className="float f-b1 bottle-wrap b1"><Image src="/img/lava-roupas.webp" alt="" width={286} height={622} className="bottle" /></div>
              <div className="float f-b2 bottle-wrap b2"><Image src="/img/brisa-do-mar.webp" alt="" width={378} height={633} className="bottle" /></div>
            </div>
          </div>
        </section>

        <section id="servicos" className="sec">
          <div className="wrap">
            <h2 className="reveal">Limpeza de piscina</h2>
            <p className="sec-sub reveal">Nosso serviço é focado em piscinas. Peça seu orçamento direto no WhatsApp.</p>
            <div className="pool reveal">
              <div className="pool-main">
                <span className="service-ico"><IconPool size={28} /></span>
                <h3>{SERVICE.nome}</h3>
                <p>{SERVICE.texto}</p>
                <a className="btn btn-gold" href={wa("Olá! Quero um orçamento para limpeza de piscina.")} target="_blank" rel="noreferrer">Pedir orçamento</a>
              </div>
              <ul className="pool-list">
                {SERVICE.itens.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="sec sec-foam shop-band">
          <div className="wrap shop-in">
            <div className="shop-photo reveal"><Image src="/img/perfumes.webp" alt="Perfumes de interiores Solar Clean" width={1400} height={677} sizes="(max-width:860px) 100vw, 560px" /></div>
            <div className="reveal">
              <h2>Loja de produtos de limpeza</h2>
              <p className="sec-sub">Lava-roupas, perfumes, produtos para a casa e para o carro. Monte o pedido no carrinho e finalize pelo WhatsApp.</p>
              <Link className="btn btn-blue" style={{ marginTop: "1.4rem" }} href="/produtos">Ver todos os produtos</Link>
            </div>
          </div>
        </section>

        <section id="sobre" className="sec">
          <div className="wrap about">
            <div className="about-photo reveal"><Image src="/img/loja.webp" alt="Prateleiras da loja O Rei da Limpeza" width={527} height={672} sizes="(max-width:860px) 100vw, 460px" /></div>
            <div className="reveal">
              <h2>Sobre nós</h2>
              <p className="about-p">O Rei da Limpeza é um novo conceito em limpeza em Santa Inês. Cuidamos da limpeza da sua piscina e temos uma loja com produtos de limpeza para você usar em casa, na roupa e no carro.</p>
              <ul className="about-list">
                <li><b>Especialistas em piscina.</b> Limpeza e tratamento da água, com atendimento em Santa Inês e região.</li>
                <li><b>Loja completa.</b> Produtos para casa, roupa e carro, com perfumes e detergentes para todo gosto.</li>
                <li><b>Atendimento direto.</b> Você chama no WhatsApp e resolve tudo na mesma conversa.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="localizacao" className="sec sec-foam">
          <div className="wrap">
            <h2 className="reveal">Onde estamos</h2>
            <p className="sec-sub reveal">Venha conhecer a loja em Santa Inês, Bahia.</p>
            <div className="map reveal">
              <iframe src={MAP_EMBED} title="Mapa: O Rei da Limpeza" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
            <div className="hero-btns reveal">
              <a className="btn btn-blue" href={MAP_ROUTE} target="_blank" rel="noreferrer"><IconPin size={20} />Como chegar</a>
              <a className="btn btn-outline" href={MAP_LINK} target="_blank" rel="noreferrer">Abrir no Google Maps</a>
            </div>
          </div>
        </section>

        <section id="contato" className="sec contact">
          <div className="wrap contact-in reveal">
            <h2>Fale com o Rei da Limpeza</h2>
            <p>Tire dúvidas, peça orçamento de piscina ou combine a entrega.</p>
            <div className="hero-btns">
              <a className="btn btn-wa" href={wa("Olá! Vim pelo site e gostaria de mais informações.")} target="_blank" rel="noreferrer"><IconWhatsApp size={20} />Chamar no WhatsApp</a>
              <a className="btn btn-ghost" href={INSTAGRAM} target="_blank" rel="noreferrer"><IconInstagram size={20} />Instagram</a>
            </div>
            <p className="contact-fone">WhatsApp: (73) 98899-8209</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
