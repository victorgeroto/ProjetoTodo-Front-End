"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FeatureCard } from "./ui/FeatureCard"; // Ajuste path se necessário

export default function HeroSection() {
  const router = useRouter();

  function handleClick() {
    router.push("/login"); // Navega para a nova página
}

  return (
    <div className="w-full min-h-[81vh] flex flex-col gap-9 items-center justify-center bg-white text-center px-4">

      <motion.p
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl max-w-2xl font-serif mt-9"
      >
        Organize suas ideias, projetos e tarefas de forma simples e visual!
      </motion.p>

      {/* Cards */}
      <div className="flex flex-wrap gap-8 justify-center mt-8">
        <FeatureCard
          type="team"
          title="Trabalho em equipe facilitado"
          description="Colabore com sua equipe de forma organizada."
        />
        <FeatureCard
          type="productivity"
          title="Aumente sua produtividade"
          description="Gerencie seu tempo e entregue mais resultados."
        />
        <FeatureCard
          type="adapt"
          title="Adapte ao seu jeito de trabalhar"
          description="Personalize fluxos de trabalho conforme sua necessidade."
        />
      </div>

      {/* Botão */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
        onClick={handleClick}
        className="mt-12 px-6 py-3 border rounded-full hover:bg-black hover:text-white cursor-pointer transition-all mb-8"
      >
        Começar agora
      </motion.button>
    </div>
  );
}
