// WhatsApp da loja (DDI 55 + DDD 73 + número)
export const WHATSAPP = "5573988998209";
export const INSTAGRAM = "https://www.instagram.com/oreidalimpezasi/";

// Localização (Google Maps)
export const MAP_COORDS = "-13.2913283,-39.8184783";
export const MAP_EMBED = `https://www.google.com/maps?q=${MAP_COORDS}&z=17&hl=pt-BR&output=embed`;
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_COORDS}`;
export const MAP_ROUTE = `https://www.google.com/maps/dir/?api=1&destination=${MAP_COORDS}`;

export const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// PREÇOS DE EXEMPLO: troque pelos valores reais.
// fit: "contain" para fotos recortadas, "cover" para fotos de ambiente.
export const PRODUCTS = [
  { id: "lava-roupas", nome: "Lava-Roupas Líquido Classic", tam: "5 L", cat: "Roupa", preco: 29.9, img: "/img/lava-roupas.webp", w: 286, h: 622, fit: "contain", desc: "Limpeza profunda e perfume agradável para a lavagem do dia a dia." },
  { id: "por-do-sol", nome: "Pôr do Sol, água perfumada para roupas", tam: "500 ml", cat: "Roupa", preco: 24.9, img: "/img/por-do-sol.webp", w: 430, h: 689, fit: "cover", desc: "Perfuma e refresca suas roupas com um aroma suave e marcante." },
  { id: "brisa-do-mar", nome: "Brisa do Mar, spray de ambientes e tecidos", tam: "500 ml", cat: "Perfumes", preco: 24.9, img: "/img/brisa-do-mar.webp", w: 378, h: 633, fit: "contain", desc: "Perfuma ambientes, sofás, cortinas e tecidos em geral." },
  { id: "perfume-interiores", nome: "Perfume de Interiores Solar Clean", tam: "100 ml", cat: "Perfumes", preco: 12.9, img: "/img/perfumes.webp", w: 1400, h: 677, fit: "cover", desc: "Spray prático para dar aroma a ambientes, carro e tecidos.", opcoes: ["New Vanilla", "Bem Estar", "Nerole", "Lavanda", "Cheirinho de Bebê", "Morango"] },
  { id: "sabao-geleia", nome: "Sabão Geléia Cascas & Folhos", tam: "1 L", cat: "Casa", preco: 8.9, img: "/img/sabao-geleia.webp", w: 213, h: 622, fit: "contain", desc: "Para limpeza mais pesada de cozinhas, banheiros, pisos e azulejos." },
  { id: "limpa-tudo", nome: "Limpa Tudo", tam: "500 ml", cat: "Casa", preco: 6.5, img: "/img/limpa-tudo.webp", w: 133, h: 426, fit: "contain", desc: "Pisos, azulejos, pias e superfícies laváveis. Biodegradável." },
  { id: "solupan-gel", nome: "Solupan Gel Original", tam: "1 L", cat: "Casa", preco: 9.9, img: "/img/solupan.webp", w: 694, h: 602, fit: "cover", desc: "Gel desengordurante para limpeza pesada de superfícies." },
  { id: "detergente-auto", nome: "Detergente Automotivo Multipower", tam: "1 L", cat: "Carro", preco: 14.9, img: "/img/detergente.webp", w: 690, h: 656, fit: "cover", desc: "Para a lavagem das partes externas do veículo, com muita espuma." },
  { id: "cera-plasticos", nome: "Cera para Plásticos", tam: "150 g", cat: "Carro", preco: 16.9, img: "/img/cera.webp", w: 692, h: 557, fit: "cover", desc: "Revitalização, proteção e brilho para painéis e acabamentos." },
];

// Chave do carrinho: "id" ou "id::opção"
export const keyOf = (id, opcao) => (opcao ? `${id}::${opcao}` : id);
export const findItem = (key) => {
  const [id, opcao] = key.split("::");
  const p = PRODUCTS.find((x) => x.id === id);
  return p ? { ...p, key, opcao } : null;
};

export const SERVICE = {
  nome: "Limpeza de piscina",
  texto: "Limpeza completa e tratamento da água, com cloro, pH e alcalinidade no ponto certo para ela ficar cristalina o ano todo.",
  itens: ["Limpeza e aspiração", "Tratamento e correção da água", "Atendimento em Santa Inês e região"],
};
