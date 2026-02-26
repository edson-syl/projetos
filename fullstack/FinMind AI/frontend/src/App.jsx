import React, { useState, useEffect, useRef } from "react";

function App() {
  const [mensagem, setMensagem] = useState("");
  const [respostas, setRespostas] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  // Scroll automático
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [respostas, loading]);

  const handleEnviar = async () => {
    if (!mensagem.trim()) return;

    const mensagemUsuario = mensagem;

    setRespostas((prev) => [
      ...prev,
      { tipo: "usuario", texto: mensagemUsuario },
    ]);

    setMensagem("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: mensagemUsuario }),
      });

      const data = await res.json();

      setRespostas((prev) => [
        ...prev,
        { tipo: "ai", texto: data.response },
      ]);
    } catch (err) {
      setRespostas((prev) => [
        ...prev,
        { tipo: "ai", texto: "Erro ao conectar com o servidor." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEnviar();
    }
  };

  return (
  <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
    
    {/* Header */}
    <div className="bg-slate-950 px-8 py-5 border-b border-slate-700 shadow-md">
      <div className="flex items-center gap-3">
        
        <img
          src="/fin-icon.png"
          alt="FinMind Logo"
          className="w-9 h-9 object-contain"
        />

        <h1 className="text-2xl font-semibold text-white tracking-wide">
          FinMind AI
        </h1>

      </div>
    </div>
    {/* Chat */}
    <div
      ref={chatRef}
      className="flex-1 overflow-y-auto px-6 py-6 space-y-4"
    >
      {respostas.map((msg, index) => (
        <Mensagem key={index} tipo={msg.tipo} texto={msg.texto} />
      ))}

      {loading && <Digitando />}
    </div>

    {/* Input */}
    <div className="p-5 border-t border-slate-700 flex gap-3 bg-slate-950">
      <input
        type="text"
        placeholder="Digite sua mensagem..."
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        onKeyDown={handleKeyPress}
        className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        onClick={handleEnviar}
        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl transition duration-200 font-medium"
      >
        Enviar
      </button>
    </div>
  </div>
);
}

// ===============================
// Componente de Mensagem com efeito digitando
// ===============================
function Mensagem({ tipo, texto }) {
  const [displayedText, setDisplayedText] = useState("");
  const velocidade = 15; // menor = mais rápido

  useEffect(() => {
    if (tipo === "ai") {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(texto.slice(0, i));
        i++;
        if (i > texto.length) clearInterval(interval);
      }, velocidade);

      return () => clearInterval(interval);
    } else {
      setDisplayedText(texto);
    }
  }, [texto, tipo]);

  const isUser = tipo === "usuario";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
          isUser
            ? "bg-emerald-500 text-white rounded-br-none"
            : "bg-slate-700 text-gray-100 rounded-bl-none"
        }`}
      >
        {displayedText}
      </div>
    </div>
  );
}

// ===============================
// Indicador animado de "digitando"
// ===============================
function Digitando() {
  return (
    <div className="flex justify-start">
      <div className="bg-slate-700 text-gray-300 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1">
        <span className="animate-bounce">•</span>
        <span className="animate-bounce delay-150">•</span>
        <span className="animate-bounce delay-300">•</span>
      </div>
    </div>
  );
}

export default App;