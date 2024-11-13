//frontend/src/app/layout.tsx

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../context/themeContext"; // Importa o ThemeProvider
import Header from "@/components/layout/Header"; // Importa o Header
import Footer from "@/components/layout/Footer"; // Importa o Footer
import Sidebar from "@/components/layout/Sidebar"; // Importa o Sidebar

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Frontend",
  description: "Aplicação para cadastro de produtos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {/* Layout de Flexbox */}
          <div className="flex min-h-screen flex-col">
            {/* Cabeçalho */}
            <Header />
            
            {/* Layout principal com Sidebar e Conteúdo */}
            <div className="flex flex-1">
              {/* Sidebar */}
           
              
              {/* Conteúdo principal */}
              <main className="flex-1 bg-gray-100">
                {children}
              </main>
            </div>
            
            {/* Rodapé */}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
