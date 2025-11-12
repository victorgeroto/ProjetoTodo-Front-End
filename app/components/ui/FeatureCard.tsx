"use client";

import { motion } from "framer-motion";
import { Users, Clock, Zap } from "lucide-react";

interface FeatureCardProps {
  type: "team" | "productivity" | "adapt";
  title: string;
  description: string;
}

const icons = {
  team: <Users size={70} />,
  productivity: <Clock size={70} />,
  adapt: <Zap size={70} />,
};

export function FeatureCard({ type, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="flex flex-col items-center justify-center text-center bg-gray-100 rounded-2xl p-8 w-120 h-100 shadow-md hover:bg-white"
    >
      <div className="text-black mb-4">{icons[type]}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
