"use client";

import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter(); 
  const handleVoltar = () => {
    router.push("/homePage"); // Navega para a homepage
  };
  const handlePerfil = () => {
    router.push("/profile"); // Navega para a página de perfil
  };


  return (
    <header className="w-full min-h-[10vh] bg-white shadow-md relative">
  <div className="mx-auto px-7 py-7 flex items-center justify-center">
    <div className="mr-auto">
      <img 
        src="images/trello.png" 
        alt="Trello" 
        className="w-10"
      />
    </div>
    <div className="text-center">
      <button
        type="button"
        className="text-2xl font-semibold text-gray-800 cursor-pointer"
        onClick={handleVoltar}
      >
        <h1>TRELLO</h1>
      </button>
    </div>
    <div className="ml-auto">
      <button
        type="button"
        className="text-gray-800 cursor-pointer mr-4"
        onClick={handlePerfil}>
      <img
      src="images/profile.png"
      alt="Profile" 
      className="w-10 h-10 rounded-full"
      />
      </button>
    </div>
  </div>
</header>

  );
}