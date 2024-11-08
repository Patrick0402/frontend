// src/components/layout/Header.tsx
import React from "react";
import Button from "../ui/Button";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="text-xl font-semibold text-gray-800">
        Gerenciador de Produtos
      </div>
      <div className="space-x-4">
        {/* Este é um exemplo de botão de logout, você pode adicionar a funcionalidade mais tarde */}
        <Link href="/login" passHref>
              <Button variant="secondary" size="medium">
                Login
              </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
