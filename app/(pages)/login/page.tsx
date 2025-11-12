"use client";

import { Images } from "lucide-react";
import { useRouter } from "next/navigation"
import Button from "../../components/ui/Button";

export default function LoginPage() {

  const router = useRouter(); 

  const handleVoltar = () => {
    router.push("/homePage"); // Navega para a homepage
  };

  const handleCriarConta = () => {
    router.push("/cadastro"); //navegar para página de cadastro
  };

  const handleContinuar = () => {
    router.push("/boards"); //navegar para página de Boards
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <img
            src="images/trello.png"
            alt="Trello"
            className="w-8 mx-auto mb-2 flex flex-row"
          />
          <h1 className="text-xl font-semibold">TRELLO</h1>
        </div>

        <form className="space-y-4">
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
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required 
            />
          </div>
          <Button
            click={handleContinuar}
            nome="Continuar"
            estilo="next"
          />
            <button
              type="button"
              className="text-md text-gray-400 cursor-pointer hover:underline mb-20 ml-30"
              onClick={handleCriarConta}
            >
              Criar conta?
            </button> 

          <div className="flex justify-center">
            <Button
              nome="Voltar"
              estilo="nextMin"
              click={handleVoltar}
            />
            </div>
            </form>
      </div>
    </div>
  );
}
