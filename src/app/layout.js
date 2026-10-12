import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";
import CartProvider from "@/components/CartProvider";
import Header from "@/components/Header";
import WaFloat from "@/components/WaFloat";

const display = Baloo_2({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });
const body = Nunito({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "O Rei da Limpeza | Limpeza de piscina e produtos de limpeza",
  description: "Limpeza de piscina em Santa Inês e região, e loja de produtos de limpeza para casa, roupa e carro. Monte seu pedido e finalize pelo WhatsApp.",
  icons: { icon: "/icon.png" },
  openGraph: { title: "O Rei da Limpeza", description: "Um novo conceito em limpeza.", images: ["/img/logo.webp"] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>
        <CartProvider>
          <Header />
          {children}
          <WaFloat />
        </CartProvider>
      </body>
    </html>
  );
}
