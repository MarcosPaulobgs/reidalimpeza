"use client";

import { useState } from "react";
import Image from "next/image";
import { PRODUCTS, brl, keyOf } from "@/data/store";
import { useCart } from "@/components/CartProvider";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";

const CATS = ["Todos", ...new Set(PRODUCTS.map((p) => p.cat))];

function Card({ p, i }) {
  const { cart, add, dec } = useCart();
  const [opcao, setOpcao] = useState(p.opcoes?.[0]);
  const k = keyOf(p.id, opcao);
  return (
    <article className="card pop" style={{ "--i": i % 8 }}>
      <div className={`card-img ${p.fit}`}>
        <Image src={p.img} alt={p.nome} width={p.w} height={p.h} sizes="(max-width:600px) 100vw, 280px" />
      </div>
      <div className="card-body">
        <h3>{p.nome}</h3>
        <p className="card-tam">{p.tam}</p>
        <p className="card-desc">{p.desc}</p>
        {p.opcoes && (
          <select className="opt" value={opcao} onChange={(e) => setOpcao(e.target.value)} aria-label="Aroma">
            {p.opcoes.map((o) => <option key={o}>{o}</option>)}
          </select>
        )}
        <div className="card-foot">
          <strong>{brl(p.preco)}</strong>
          {cart[k] ? (
            <div className="qty">
              <button onClick={() => dec(k)} aria-label="Diminuir">−</button>
              <span>{cart[k]}</span>
              <button onClick={() => add(k)} aria-label="Aumentar">+</button>
            </div>
          ) : (
            <button className="btn btn-blue btn-sm" onClick={() => add(k)}>Adicionar</button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Produtos() {
  const [cat, setCat] = useState("Todos");
  const { count, openCart } = useCart();
  const lista = PRODUCTS.filter((p) => cat === "Todos" || p.cat === cat);
  return (
    <>
      <Reveal />
      <main className="shop">
        <section className="shop-head">
          <div className="wrap load" style={{ "--i": 0 }}>
            <h1>Produtos de limpeza</h1>
            <p>Adicione ao carrinho e finalize o pedido pelo WhatsApp.</p>
          </div>
        </section>
        <section className="sec sec-foam shop-list">
          <div className="wrap">
            <div className="chips load" style={{ "--i": 1 }}>
              {CATS.map((c) => (
                <button key={c} className={`chip ${cat === c ? "chip-on" : ""}`} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
            <div className="grid" key={cat}>
              {lista.map((p, i) => <Card key={p.id} p={p} i={i} />)}
            </div>
            {count > 0 && (
              <div className="cart-bar">
                <button className="btn btn-wa" onClick={openCart}>Ver carrinho ({count}) e finalizar</button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
