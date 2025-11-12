"use client";

import { Images } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "../../components/ui/Button";

export default function CadastroPage() {
  const router = useRouter();


  const handleVoltar = () => {
    router.push("/boards"); //navegar para página de Boards
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className=" flex flex-row text-center mb-6">
        <img
          src="images/trello.png"
          alt="Trello"
          className="w-8 mx-auto mb-2 flex flex-row"
        />
        <h1 className="text-xl font-semibold">TRELLO</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <div className=" flex flex-row  items-center justify-center text-center mb-6">
          <img
            src="images/profile.png"
            alt="Profile"
            className="w-10 m-2 flex flex-row"
          />
          <h1 className="text-xl font-semibold">PROFILE</h1>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nome:</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email:</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Senha:</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 mb-5"
              required
            />
          </div>

          <div className="w-full border border-gray-300"></div>

          <div className="flex justify-center">
            <Button nome="Voltar" estilo="nextMin" click={handleVoltar} />
          </div>
        </form>
      </div>
    </div>
  );
}
