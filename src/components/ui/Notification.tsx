"use client";

import React, { useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error"; // Adiciona variação de tipo se precisar
  onClose: () => void;
  duration?: number; // Em milissegundos (por exemplo, 3000 para 3 segundos)
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    // Fechar automaticamente após `duration` milissegundos
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    // Limpa o timer se o componente desmontar ou `onClose` for chamado manualmente
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-opacity duration-300 ${
        type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
      }`}
    >
      <div className="flex items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-300"
          aria-label="Fechar notificação"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Notification;
