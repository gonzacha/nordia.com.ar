"use client";

import { Message, DemoEvent } from "@/app/types/demo";
import { Terminal, Send } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import Card from "../ui/Card";

type AdminPanelProps = {
    messages: Message[];
    events: DemoEvent[];
    onCommand: (command: string) => void;
    isProcessing: boolean;
};

export default function AdminPanel({
    messages,
    events,
    onCommand,
    isProcessing
}: AdminPanelProps) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim() || isProcessing) return;
        onCommand(input.trim());
        setInput("");
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    const adminMessages = messages.filter(m => m.role === "admin" || m.role === "system");

    return (
        <div className="h-full flex flex-col gap-4">
            {/* Command Input */}
            <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Terminal className="w-5 h-5 text-nordia" />
                    <h3 className="font-heading text-lg font-semibold text-neutral-900">
                        Panel Admin
                    </h3>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Escribí: activar clientes dormidos"
                        disabled={isProcessing}
                        className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-nordia disabled:bg-neutral-100 disabled:cursor-not-allowed text-sm"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isProcessing || !input.trim()}
                        className="px-4 py-2 bg-nordia text-neutral-900 font-semibold rounded-lg hover:bg-nordia-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                        Enviar
                    </button>
                </div>
                <p className="text-xs text-neutral-500 mt-2">
                    Comandos disponibles: <code className="bg-neutral-100 px-1 rounded">activar clientes dormidos</code>
                </p>
            </Card>

            {/* Activity Log */}
            <Card className="flex-1 p-4 overflow-hidden flex flex-col">
                <h4 className="font-semibold text-neutral-900 mb-3">Historial de Actividad</h4>
                <div className="flex-1 overflow-y-auto space-y-2">
                    {adminMessages.length === 0 ? (
                        <p className="text-neutral-400 text-sm italic">
                            Sin actividad aún...
                        </p>
                    ) : (
                        adminMessages.map((message) => (
                            <div
                                key={message.id}
                                className={`p-3 rounded-lg text-sm ${message.role === "admin"
                                        ? "bg-nordia/10 border border-nordia/30"
                                        : "bg-neutral-100"
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <p className="flex-1">
                                        <span className="font-semibold">
                                            {message.role === "admin" ? "Admin:" : "Sistema:"}
                                        </span>{" "}
                                        {message.text}
                                    </p>
                                    <span className="text-xs text-neutral-500 whitespace-nowrap">
                                        {message.timestamp.toLocaleTimeString("es-AR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit"
                                        })}
                                    </span>
                                </div>
                                {message.metadata && (
                                    <div className="mt-1 text-xs text-neutral-600">
                                        {message.metadata.clientName && (
                                            <span>Cliente: {message.metadata.clientName}</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </Card>
        </div>
    );
}
