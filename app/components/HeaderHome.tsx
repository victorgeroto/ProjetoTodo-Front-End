"use client";

import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter(); 
  const handleVoltar = () => {
    router.push("/homePage"); // Navega para a homepage
  };


  return (
    <header className="w-full min-h-[10vh] bg-white shadow-md relative">
  <div className="mx-auto px-7 py-7 flex items-center justify-start gap-4">
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
  </div>
</header>

  );
}