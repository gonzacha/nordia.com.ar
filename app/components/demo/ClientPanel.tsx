"use client";

import { Message } from "@/app/types/demo";
import { Smartphone } from "lucide-react";
import Card from "../ui/Card";

type ClientPanelProps = {
    messages: Message[];
    clientName: string;
};

export default function ClientPanel({ messages, clientName }: ClientPanelProps) {
    const clientMessages = messages.filter(m => m.role === "bot" || m.role === "client");

    return (
        <div className="h-full flex flex-col">
            <div className="bg-nordia p-4 rounded-t-xl flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-neutral-900" />
                <div>
                    <h3 className="font-semibold text-neutral-900">WhatsApp</h3>
                    <p className="text-sm text-neutral-700">ElectroHogar Bot</p>
                </div>
            </div>

            <Card className="flex-1 rounded-t-none overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50">
                    {clientMessages.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-neutral-400 text-sm italic">
                                Esperando mensajes...
                            </p>
                        </div>
                    ) : (
                        clientMessages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.role === "client" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-2 rounded-2xl whitespace-pre-line ${message.role === "client"
                                            ? "bg-nordia text-neutral-900"
                                            : "bg-white text-neutral-900 border border-neutral-200"
                                        }`}
                                >
                                    <p className="text-sm">{message.text}</p>
                                    <p className="text-xs opacity-60 mt-1">
                                        {message.timestamp.toLocaleTimeString("es-AR", {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-3 bg-white border-t border-neutral-200">
                    <div className="flex items-center gap-2 px-3 py-2 bg-neutral-100 rounded-full">
                        <p className="text-sm text-neutral-500 flex-1">
                            Vista del cliente: {clientName}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
