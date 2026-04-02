"use client";

import { useState, useEffect } from "react";
import { Message, Rule, FlowState, DemoEvent, Client } from "@/app/types/demo";
import { mockDormantClients, reactivationRules, messageTemplates, clientResponses } from "@/app/data/commerceFlows";
import AdminPanel from "./AdminPanel";
import ClientPanel from "./ClientPanel";
import RulesDisplay from "./RulesDisplay";

export default function CommerceDemo() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [rules, setRules] = useState<Rule[]>(reactivationRules);
    const [events, setEvents] = useState<DemoEvent[]>([]);
    const [flowState, setFlowState] = useState<FlowState>("idle");
    const [currentRuleId, setCurrentRuleId] = useState<string | undefined>();
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client>(mockDormantClients[0]);

    const addMessage = (role: Message["role"], text: string, metadata?: Message["metadata"]) => {
        const newMessage: Message = {
            id: `msg_${Date.now()}_${Math.random()}`,
            role,
            text,
            timestamp: new Date(),
            metadata
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const updateRuleStatus = (ruleId: string, status: Rule["status"]) => {
        setRules(prev =>
            prev.map(rule =>
                rule.id === ruleId ? { ...rule, status } : rule
            )
        );
    };

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const executeReactivationFlow = async () => {
        setIsProcessing(true);

        // Step 1: Identify dormant clients
        setCurrentRuleId("rule_001");
        updateRuleStatus("rule_001", "active");
        await sleep(1500);

        addMessage("system", `Identificados ${mockDormantClients.length} clientes dormidos (sin compra en 60+ días)`);
        addMessage("system", `Cliente seleccionado: ${selectedClient.name} - ${selectedClient.daysSinceLastPurchase} días sin compra`);
        updateRuleStatus("rule_001", "completed");
        await sleep(1000);

        // Step 2: Send personalized message
        setCurrentRuleId("rule_002");
        updateRuleStatus("rule_002", "active");
        setFlowState("sending_messages");
        await sleep(1500);

        const reactivationMsg = messageTemplates.reactivation(selectedClient.name);
        addMessage("bot", reactivationMsg, {
            clientName: selectedClient.name,
            clientId: selectedClient.id
        });
        addMessage("system", `Mensaje enviado a ${selectedClient.name}`, {
            clientName: selectedClient.name,
            action: "message_sent"
        });
        updateRuleStatus("rule_002", "completed");
        await sleep(2000);

        // Step 3: Simulate client response
        setCurrentRuleId("rule_003");
        updateRuleStatus("rule_003", "active");
        setFlowState("waiting_response");
        await sleep(2500);

        addMessage("client", clientResponses.interested, {
            clientName: selectedClient.name,
            clientId: selectedClient.id
        });
        addMessage("system", `Cliente ${selectedClient.name} mostró interés - Procesando respuesta...`);
        await sleep(1500);

        // Send offer details
        const offerMsg = messageTemplates.offerDetails();
        addMessage("bot", offerMsg, {
            clientName: selectedClient.name,
            clientId: selectedClient.id
        });
        addMessage("system", `Oferta enviada con código de descuento`);
        updateRuleStatus("rule_003", "completed");
        await sleep(2500);

        // Step 4: Client accepts and converts
        setCurrentRuleId("rule_004");
        updateRuleStatus("rule_004", "active");
        setFlowState("processing_response");
        await sleep(2000);

        addMessage("client", clientResponses.acceptOffer, {
            clientName: selectedClient.name,
            clientId: selectedClient.id
        });
        addMessage("system", `Cliente acepta oferta - Procesando pedido...`);
        await sleep(1500);

        // Confirm conversion
        const confirmationMsg = messageTemplates.confirmation();
        addMessage("bot", confirmationMsg, {
            clientName: selectedClient.name,
            clientId: selectedClient.id
        });
        addMessage("system", `✅ Conversión exitosa - Cliente reactivado`, {
            clientName: selectedClient.name,
            action: "conversion_completed"
        });
        updateRuleStatus("rule_004", "completed");

        setCurrentRuleId(undefined);
        setFlowState("completed");
        setIsProcessing(false);

        // Final summary
        await sleep(1000);
        addMessage("system", `📊 Resumen: 1 cliente reactivado, 1 venta generada, ROI positivo`);
    };

    const handleCommand = (command: string) => {
        const lowerCommand = command.toLowerCase().trim();

        addMessage("admin", command);

        if (lowerCommand.includes("activar") && lowerCommand.includes("dormido")) {
            addMessage("system", "Iniciando flujo de reactivación de clientes dormidos...");

            // Reset rules
            setRules(reactivationRules.map(r => ({ ...r, status: "pending" })));

            // Execute flow
            setTimeout(() => executeReactivationFlow(), 500);
        } else if (lowerCommand === "reset") {
            // Reset demo
            setMessages([]);
            setRules(reactivationRules.map(r => ({ ...r, status: "pending" })));
            setEvents([]);
            setFlowState("idle");
            setCurrentRuleId(undefined);
            setIsProcessing(false);
            addMessage("system", "Demo reiniciada. Escribí 'activar clientes dormidos' para comenzar.");
        } else {
            addMessage("system", "Comando no reconocido. Probá: 'activar clientes dormidos'");
        }
    };

    // Initial message
    useEffect(() => {
        addMessage("system", "Sistema listo. Escribí 'activar clientes dormidos' para comenzar la demo.");
    }, []);

    return (
        <div className="min-h-screen bg-neutral-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
                        Demo: Reactivación de Clientes
                    </h1>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Flujo determinístico para recuperar clientes dormidos en comercio electrónico
                    </p>
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {/* Left: Admin Panel */}
                    <div className="lg:col-span-1">
                        <AdminPanel
                            messages={messages}
                            events={events}
                            onCommand={handleCommand}
                            isProcessing={isProcessing}
                        />
                    </div>

                    {/* Middle: Rules Display */}
                    <div className="lg:col-span-1">
                        <RulesDisplay rules={rules} currentRuleId={currentRuleId} />
                    </div>

                    {/* Right: Client Panel */}
                    <div className="lg:col-span-1">
                        <ClientPanel
                            messages={messages}
                            clientName={selectedClient.name}
                        />
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-neutral-500">
                        💡 Esta es una simulación 100% client-side. No se conecta a servicios reales.
                    </p>
                    <button
                        onClick={() => handleCommand("reset")}
                        className="mt-3 text-sm text-nordia hover:text-nordia-dark font-medium"
                    >
                        Reiniciar demo
                    </button>
                </div>
            </div>
        </div>
    );
}
