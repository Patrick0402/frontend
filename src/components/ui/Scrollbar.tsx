"use client";

import React from 'react';

interface ScrollbarProps {
  children: React.ReactNode;
  className?: string;
}

const Scrollbar: React.FC<ScrollbarProps> = ({ children, className }) => {
  return (
    <div className={`overflow-y-auto ${className}`}>
      {children}
      <style jsx>{`
        /* Customização da barra de rolagem */
        .overflow-y-auto::-webkit-scrollbar {
          width: 10px;
          background-color: transparent; /* Fundo transparente para visual mais leve */
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.6);
          border-radius: 12px;
          border: 2px solid transparent; /* Espaço extra ao redor do thumb */
          background-clip: padding-box; /* Faz com que a cor interna do thumb não passe do espaço */
          transition: background-color 0.3s ease, border 0.3s ease;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background-color: rgba(80, 80, 80, 0.8);
          border: 2px solid rgba(0, 0, 0, 0.2); /* Leve efeito de sombra no hover */
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background-color: rgba(220, 220, 220, 0.4);
          border-radius: 10px;
        }

        /* Customizações adicionais para o modo escuro */
        .dark .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: rgba(150, 150, 150, 0.5);
        }

        .dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background-color: rgba(180, 180, 180, 0.7);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .dark .overflow-y-auto::-webkit-scrollbar-track {
          background-color: rgba(50, 50, 50, 0.4);
        }
      `}</style>
    </div>
  );
};

export default Scrollbar;