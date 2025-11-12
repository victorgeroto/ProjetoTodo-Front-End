"use client";

import Header from "../../components/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Board {
  id: number;
  nome: string;
  descricao: string;
  tarefas: number;
  membros: number;
}

export default function BoardsPage() {
  const router = useRouter();

  const [boards, setBoards] = useState<Board[]>([
    {
      id: 1,
      nome: "Projeto Mobile",
      descricao: "Desenvolvimento de app mobile.",
      tarefas: 15,
      membros: 4,
    },
    {
      id: 2,
      nome: "Projeto Empresa X",
      descricao: "Desenvolvimento para empresa X.",
      tarefas: 5,
      membros: 5,
    },
    {
      id: 3,
      nome: "Projeto Website",
      descricao: "Desenvolvimento de um website.",
      tarefas: 5,
      membros: 3,
    },
    {
      id: 4,
      nome: "Projeto Empresa Y",
      descricao: "Desenvolvimento para empresa Y.",
      tarefas: 15,
      membros: 6,
    },
  ]);

  const [pesquisa, setPesquisa] = useState("");
  const [mostrarCriador, setMostrarCriador] = useState(false);

  const [nomeBoard, setNomeBoard] = useState("");
  const [descricaoBoard, setDescricaoBoard] = useState("");
  const [membrosBoard, setMembrosBoard] = useState<number>(1);

  const filtrados = boards.filter((b) =>
    b.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const totalTarefas = boards.reduce((acc, b) => acc + b.tarefas, 0);
  const concluidas = 2;

  const criarBoard = () => {
    const novoBoard: Board = {
      id: boards.length + 1,
      nome: nomeBoard || "Novo Board",
      descricao: descricaoBoard || "Sem descrição.",
      tarefas: 10,
      membros: membrosBoard || 1,
    };
    setBoards([...boards, novoBoard]);
    setMostrarCriador(false);
    setNomeBoard("");
    setDescricaoBoard("");
    setMembrosBoard(1);
  };

  const handleClick = (board: Board) => {
    router.push(`/projetos?titulo=${encodeURIComponent(board.nome)}`);
  };

  return (
    <>
      <Header />
      <div className="w-full bg-black py-3 px-10">
        <h1 className="text-2xl text-white">Bem-vindo!</h1>
      </div>

      <div className="p-10">
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Pesquisar Board"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className="border rounded-full px-4 py-2 w-1/3 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <h2 className="text-xl font-semibold mb-5">
          Aqui estão seus projetos.
        </h2>
        <div className="flex flex-wrap gap-6 mb-10">
          <div className="bg-[#727272] rounded-lg px-6 py-4 text-white">
            <p className="font-semibold">Total de Boards</p>
            <p className="text-2xl">{boards.length}</p>
          </div>
          <div className="bg-[#727272] rounded-lg px-6 py-4 text-white">
            <p className="font-semibold">Total de Tarefas</p>
            <p className="text-2xl">{totalTarefas}</p>
          </div>
          <div className="bg-[#727272] rounded-lg px-6 py-4 text-white">
            <p className="font-semibold">Concluídas</p>
            <p className="text-2xl">{concluidas}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="text-lg font-semibold">Seus Boards</h3>
            <p className="text-sm text-gray-600">
              Gerencie todos os seus boards ativos
            </p>
          </div>

          <button
            onClick={() => setMostrarCriador(true)}
            className="bg-black text-white py-2 px-4 rounded-2xl hover:bg-gray-800 transition"
          >
            Criar novo Board
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtrados.map((b) => (
            <div
              key={b.id}
              onClick={() => handleClick(b)}
              className="bg-[#C5C5C5] p-5 rounded-xl shadow cursor-pointer hover:scale-105 transition-transform"
            >
              <h4 className="text-lg font-semibold mb-2">{b.nome}</h4>
              <p className="text-sm text-gray-700 mb-3">{b.descricao}</p>
              <p className="text-sm text-gray-800">
                {b.tarefas} Tarefas &nbsp; 👥 {b.membros} Membros
              </p>
            </div>
          ))}
        </div>

        {mostrarCriador && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96">
              <h2 className="text-lg font-semibold mb-4">Criar novo Board</h2>

              <input
                type="text"
                placeholder="Nome do board"
                className="w-full border rounded px-3 py-2 mb-3"
                value={nomeBoard}
                onChange={(e) => setNomeBoard(e.target.value)}
              />

              <input
                type="text"
                placeholder="Descrição"
                className="w-full border rounded px-3 py-2 mb-3"
                value={descricaoBoard}
                onChange={(e) => setDescricaoBoard(e.target.value)}
              />

              <input
                type="number"
                placeholder="Quantidade de membros"
                className="w-full border rounded px-3 py-2 mb-4"
                value={membrosBoard}
                onChange={(e) => setMembrosBoard(Number(e.target.value))}
                min={1}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setMostrarCriador(false)}
                  className="w-full bg-gray-300 px-4 py-3 hover:bg-gray-400 transition rounded-2xl"
                >
                  Cancelar
                </button>
                <button
                  onClick={criarBoard}
                  className="w-full bg-blue-500 text-white px-4 py-3 hover:bg-blue-600 transition rounded-2xl"
                >
                  Criar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
