import next from "next";

interface IBotao {
  nome: string;
  estilo: keyof typeof estilos;
  click: () => void;
}

const estilos = {
  default: "bg-gray-200 hover:bg-gray-300",
  logout: "bg-red-200 hover:bg-red-300",
  outline: "bg-none outline outline-1 outline-gray-300 hover:bg-gray-100",
  success: "bg-green-200 hover:bg-green-300",
  error: "bg-amber-200 hover:bg-amber-300",
  transparent: "bg-none",
  enter: "w-full bg-blue-400 hover:bg-blue-500 mt-auto text-white py-2 rounded transition",
  next: "w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition",
  enterMin: "bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded transition",
  nextMin: "flex flex-col bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition",
} as const;

export default function Button({ nome, estilo, click }: IBotao) {
  const estiloSelecionado = estilos[estilo];

  return (
    <button
      type="button"
      onClick={click}
      className={`p-2 px-8 rounded-md font-semibold cursor-pointer transition ${estiloSelecionado}`}
    >
      {nome}
    </button>
  );
}
