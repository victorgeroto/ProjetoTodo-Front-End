"use client";

import Header from "../../components/Header";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface Lista {
  id: number;
  nome: string;
}

interface Cartao {
  id: number;
  nome: string;
  listaId: number;
}

export default function ProjetoPage() {
  //Listas e cartões
  const [listas, setListas] = useState<Lista[]>([]);
  const [cartoes, setCartoes] = useState<Cartao[]>([]);
  const searchParams = useSearchParams();
  const titulo = searchParams.get("titulo");

  //Mostrar modal
  const [mostrarCriador, setMostrarCriador] = useState(false);
  const [mostrarCriadorCartao, setMostrarCriadorCartao] = useState<
    null | number
  >(null);

  //Criar lista e cartão
  const [nomeLista, setNomeLista] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");

  //Edição cartão
  const [cartaoEditando, setCartaoEditando] = useState<Cartao | null>(null);
  const [novoNomeCartao, setNovoNomeCartao] = useState("");

  // Drag & Drop state
  const [dragCardId, setDragCardId] = useState<number | null>(null);
  const [dragOverListaId, setDragOverListaId] = useState<number | null>(null);

  //Criar lista
  const criarLista = () => {
    const novaLista: Lista = {
      id: listas.length + 1,
      nome: nomeLista || "Nova Lista",
    };

    // Adiciona a nova lista
    setListas([...listas, novaLista]);
    setMostrarCriador(false);
    setNomeLista("");
  };

  //Criar cartão
  const criarCartao = (listaId: number) => {
    if (!nomeCartao.trim()) return;
    const novoCartao: Cartao = {
      id: cartoes.length + 1,
      nome: nomeCartao,
      listaId,
    };

    // Adiciona o novo cartão à lista de cartões
    setCartoes([...cartoes, novoCartao]);
    setNomeCartao("");
    setMostrarCriadorCartao(null);
  };

  //Excluir cartao
  const excluirCartao = (id: number) => {
    setCartoes(cartoes.filter((c) => c.id !== id));
  };

  //Modal edição cartão
  const abrirEditarCartao = (cartao: Cartao) => {
    setCartaoEditando(cartao);
    setNovoNomeCartao(cartao.nome);
  };
  // Edição do cartão
  const salvarEdicaoCartao = () => {
    if (!cartaoEditando) return;
    setCartoes(
      cartoes.map((c) =>
        c.id === cartaoEditando.id ? { ...c, nome: novoNomeCartao } : c
      )
    );

    // Fecha o modal de edição
    setCartaoEditando(null);
    setNovoNomeCartao("");
  };

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData("text/plain", String(id));
    e.dataTransfer.effectAllowed = "move";
    setDragCardId(id);
  };

  const handleDragEnd = () => {
    setDragCardId(null);
    setDragOverListaId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // necessário para permitir drop
  };

  const handleDragEnter = (listaId: number) => {
    setDragOverListaId(listaId);
  };

  const handleDragLeave = () => {
    setDragOverListaId(null);
  };

  const handleDrop = (e: React.DragEvent, listaId: number) => {
    e.preventDefault();
    const idStr = e.dataTransfer.getData("text/plain");
    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      handleDragEnd();
      return;
    }

    setCartoes((prev) => prev.map((c) => (c.id === id ? { ...c, listaId } : c)));
    handleDragEnd();
  };

  return (
    <>
      <Header />
      <div className="w-screen bg-black py-3 px-10">
        <h1 className="text-2xl text-white">{titulo}</h1>
      </div>

      <div className="flex flex-row items-center justify-end p-10 mt-2">
        <button
          onClick={() => setMostrarCriador(true)}
          className="bg-black w-80 text-white py-2 px-4 rounded-2xl hover:bg-gray-800 transition"
        >
          Adicionar Nova Lista
        </button>
      </div>

      <div className="flex items-start gap-6 px-10 mt-10 overflow-x-auto overflow-y-auto no-scrollbar pb-4">
        {listas.map((lista) => (
          <div
            key={lista.id}
            className="bg-white rounded-2xl shadow-lg w-80 h-[450px] flex flex-col"
          >
            <div className="bg-black text-white py-2 px-4 rounded-t-2xl">
              <h2 className="text-lg font-semibold text-center">
                {lista.nome}
              </h2>
            </div>

            {/* Área que recebe drops */}
            <div
              className={`bg-gray-100 flex flex-col justify-between flex-1 p-4 rounded-b-2xl transition
                ${dragOverListaId === lista.id ? "ring-2 ring-blue-400" : ""}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, lista.id)}
              onDragEnter={() => handleDragEnter(lista.id)}
              onDragLeave={handleDragLeave}
            >
              <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
                {cartoes
                  .filter((cartao) => cartao.listaId === lista.id)
                  .map((cartao) => (
                    <div
                      key={cartao.id}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, cartao.id)}
                      onDragEnd={handleDragEnd}
                      className={`bg-white border border-gray-300 rounded-2xl p-3 text-sm text-gray-800 shadow-sm flex justify-between items-center
                        ${dragCardId === cartao.id ? "opacity-40" : ""}`}
                    >
                      <span className="truncate w-[60%]">{cartao.nome}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => abrirEditarCartao(cartao)}
                          className="text-blue-600 hover:text-blue-800 text-xs font-semibold cursor-pointer"
                        >
                         <img 
                          src="images/editar.png" 
                          alt="Editar" 
                          className="w-4.5"
                        />
                        </button>
                        <button
                          onClick={() => excluirCartao(cartao.id)}
                          className="text-red-600 hover:text-red-800 text-xs font-semibold cursor-pointer"
                        >
                        <img 
                          src="images/lixeira.png" 
                          alt="Lixeira" 
                          className="w-4"
                        />
       
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer hover:underline mt-4"
                onClick={() => setMostrarCriadorCartao(lista.id)}
              >
                Criar Novo Cartão
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DE CRIAR NOVA LISTA */}
      {mostrarCriador && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl w-180">
            <h2 className="text-lg font-semibold mb-4">Criar nova Lista</h2>

            <input
              type="text"
              placeholder="Nome da lista"
              className="w-full border rounded px-3 py-2 mb-3"
              value={nomeLista}
              onChange={(e) => setNomeLista(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarCriador(false)}
                className="w-full bg-gray-300 px-4 py-3 hover:bg-gray-400 transition rounded-2xl"
              >
                Cancelar
              </button>
              <button
                onClick={criarLista}
                className="w-full bg-blue-500 text-white px-4 py-3 hover:bg-blue-600 transition rounded-2xl"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CRIAR NOVO CARTÃO */}
      {mostrarCriadorCartao && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl w-180">
            <h2 className="text-lg font-semibold mb-4">Criar novo Cartão</h2>

            <input
              type="text"
              placeholder="Nome do cartão"
              className="w-full border rounded px-3 py-2 mb-3"
              value={nomeCartao}
              onChange={(e) => setNomeCartao(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarCriadorCartao(null)}
                className="w-full bg-gray-300 px-4 py-3 hover:bg-gray-400 transition rounded-2xl"
              >
                Cancelar
              </button>
              <button
                onClick={() => criarCartao(mostrarCriadorCartao)}
                className="w-full bg-blue-500 text-white px-4 py-3 hover:bg-blue-600 transition rounded-2xl"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}

      {cartaoEditando && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl w-180">
            <h2 className="text-lg font-semibold mb-4">Editar Cartão</h2>

            <input
              type="text"
              placeholder="Novo nome do cartão"
              className="w-full border rounded px-3 py-2 mb-3"
              value={novoNomeCartao}
              onChange={(e) => setNovoNomeCartao(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCartaoEditando(null)}
                className="w-full bg-gray-300 px-4 py-3 hover:bg-gray-400 transition rounded-2xl"
              >
                Cancelar
              </button>
              <button
                onClick={salvarEdicaoCartao}
                className="w-full bg-blue-500 text-white px-4 py-3 hover:bg-blue-600 transition rounded-2xl"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}