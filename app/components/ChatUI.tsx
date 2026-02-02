"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";

type Message = {
  role: "system" | "user" | "bot";
  text: string;
};

type State = "idle" | "setup_name" | "setup_hours" | "setup_services" | "completed";

type BusinessData = {
  name: string;
  hours: string;
  services: string;
};

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [state, setState] = useState<State>("idle");
  const [businessData, setBusinessData] = useState<BusinessData>({
    name: "",
    hours: "",
    services: ""
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial system message
  useEffect(() => {
    setMessages([
      {
        role: "bot",
        text: "Hola, soy Nordia.\nPuedo ayudarte a configurar un negocio o mostrarte un ejemplo.\n\nEscribí: setup"
      }
    ]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (role: Message["role"], text: string) => {
    setMessages(prev => [...prev, { role, text }]);
  };

  const processMessage = (userText: string) => {
    const lowerText = userText.toLowerCase().trim();

    switch (state) {
      case "idle":
        if (lowerText === "setup") {
          addMessage("bot", "Perfecto. ¿Cómo se llama tu negocio?");
          setState("setup_name");
        } else {
          addMessage("bot", "No entendí. Escribí 'setup' para empezar.");
        }
        break;

      case "setup_name":
        setBusinessData(prev => ({ ...prev, name: userText }));
        addMessage("bot", "Bien. ¿Qué horarios tenés?");
        setState("setup_hours");
        break;

      case "setup_hours":
        setBusinessData(prev => ({ ...prev, hours: userText }));
        addMessage("bot", "¿Qué servicios ofrecés?");
        setState("setup_services");
        break;

      case "setup_services":
        setBusinessData(prev => ({ ...prev, services: userText }));
        addMessage("bot", "Listo. Negocio configurado.\nProbá escribir: servicios o turno");
        setState("completed");
        break;

      case "completed":
        if (lowerText.includes("servicio")) {
          addMessage("bot", `Servicios de ${businessData.name}:\n- ${businessData.services}\n- Corte premium\n- Afeitado\n\nPrecio desde $8.500`);
        } else if (lowerText.includes("turno")) {
          addMessage("bot", "¿Para qué día querés el turno?");
        } else {
          addMessage("bot", "No entendí. Probá escribir: servicios o turno");
        }
        break;
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    addMessage("user", input);

    // Process message
    processMessage(input);

    // Clear input
    setInput("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-950">
      {/* Chat container */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-line ${
                  message.role === "user"
                    ? "bg-[#00ff88] text-neutral-900"
                    : "bg-neutral-800 text-white"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-neutral-800 bg-neutral-900 p-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribí un mensaje..."
            className="flex-1 px-4 py-3 bg-neutral-800 text-white rounded-xl border border-neutral-700 focus:outline-none focus:border-[#00ff88] placeholder-neutral-500"
          />
          <button
            onClick={handleSend}
            className="px-6 py-3 bg-[#00ff88] text-neutral-900 font-semibold rounded-xl hover:bg-[#00ff88]/90 transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
