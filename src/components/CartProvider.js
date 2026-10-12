"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { WHATSAPP, brl, findItem } from "@/data/store";
import { IconClose, IconWhatsApp } from "@/components/Icons";

const Ctx = createContext(null);
export const useCart = () => useContext(Ctx);
export const wa = (t) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;

export default function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nome: "", modo: "Retirada na loja", endereco: "" });

  useEffect(() => {
    try { const s = localStorage.getItem("rdl-cart2"); if (s) setCart(JSON.parse(s)); } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("rdl-cart2", JSON.stringify(cart)); } catch {}
  }, [cart]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const items = Object.keys(cart).map((k) => { const i = findItem(k); return i && { ...i, qty: cart[k] }; }).filter(Boolean);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.preco, 0);
  const entrega = form.modo === "Entrega";
  const nomeOk = form.nome.trim().length > 0;
  const pronto = items.length > 0 && nomeOk && (!entrega || form.endereco.trim());

  const add = (k) => setCart((c) => ({ ...c, [k]: (c[k] || 0) + 1 }));
  const dec = (k) => setCart((c) => { const n = { ...c }; n[k] > 1 ? n[k]-- : delete n[k]; return n; });

  const enviar = () => {
    if (!pronto) return;
    const linhas = items.map((i) => `• ${i.qty}x ${i.nome}${i.opcao ? ` - ${i.opcao}` : ""} (${i.tam}) - ${brl(i.qty * i.preco)}`);
    const txt = [
      "Olá! Quero fazer um pedido pelo site:", "", ...linhas, "", `Total: ${brl(total)}`, "",
      `Nome: ${form.nome.trim()}`,
      `Recebimento: ${form.modo}`,
      entrega && `Endereço: ${form.endereco.trim()}`,
    ].filter((l) => l !== false && l !== "" || l === "").join("\n");
    window.open(wa(txt), "_blank");
  };

  return (
    <Ctx.Provider value={{ cart, add, dec, count, openCart: () => setOpen(true) }}>
      {children}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}
      <aside className={`drawer ${open ? "drawer-open" : ""}`} aria-hidden={!open}>
        <div className="drawer-head">
          <h3>Seu pedido</h3>
          <button onClick={() => setOpen(false)} aria-label="Fechar carrinho"><IconClose size={18} /></button>
        </div>
        <div className="drawer-body">
          {items.length === 0 ? (
            <p className="empty">Seu carrinho está vazio. Adicione produtos para montar o pedido.</p>
          ) : (
            <>
              <ul className="lines">
                {items.map((i) => (
                  <li key={i.key}>
                    <Image src={i.img} alt="" width={i.w} height={i.h} />
                    <div>
                      <b>{i.nome}</b>
                      <small>{i.opcao ? `${i.opcao} · ` : ""}{i.tam} · {brl(i.preco)}</small>
                      <div className="qty">
                        <button onClick={() => dec(i.key)} aria-label="Diminuir">−</button>
                        <span>{i.qty}</span>
                        <button onClick={() => add(i.key)} aria-label="Aumentar">+</button>
                      </div>
                    </div>
                    <strong>{brl(i.qty * i.preco)}</strong>
                  </li>
                ))}
              </ul>
              <label>Seu nome *<input value={form.nome} required aria-required="true" onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Como podemos te chamar?" /></label>
              <label>Recebimento
                <select value={form.modo} onChange={(e) => setForm({ ...form, modo: e.target.value })}>
                  <option>Retirada na loja</option>
                  <option>Entrega</option>
                </select>
              </label>
              {entrega && <label>Endereço de entrega<input value={form.endereco} onChange={(e) => setForm({ ...form, endereco: e.target.value })} placeholder="Rua, número e bairro" /></label>}
            </>
          )}
        </div>
        <div className="drawer-foot">
          <div className="total"><span>Total</span><strong>{brl(total)}</strong></div>
          <button className="btn btn-wa btn-full" disabled={!pronto} onClick={enviar}><IconWhatsApp size={20} />Finalizar pedido no WhatsApp</button>
          {items.length > 0 && !nomeOk && <small>Informe seu nome para finalizar o pedido.</small>}
          {entrega && !form.endereco.trim() && items.length > 0 && <small>Informe o endereço para enviar.</small>}
        </div>
      </aside>
    </Ctx.Provider>
  );
}
