"use client"

import { useParams } from "next/navigation";

export default function Products() {

    const params = useParams();

    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>Produtos</h1>

        <p>Detalhes do produto #{params.id}</p>
      </div>
    );
  }
  