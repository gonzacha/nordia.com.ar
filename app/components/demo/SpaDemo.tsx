"use client";

import { useState, useEffect, useRef } from "react";
import { Message, Rule, FlowState } from "@/app/types/demo";
import {
    spaServices,
    spaAvailability,
    availableDates,
    spaCustomers,
    spaBookingRules,
    spaMessageTemplates,
    type SpaService
} from "@/app/data/spaFlows";
import { MessageQueue } from "@/app/utils/messageQueue";
import {
    parseDateInput,
    parseTimeInput,
    parseServiceInput,
    calculateTypingDelay,
    formatDateDisplay,
    formatTimeDisplay
} from "@/app/utils/inputParsing";
import AdminPanel from "./AdminPanel";
import ClientPanelWithTyping from "./ClientPanelWithTyping";
import RulesDisplay from "./RulesDisplay";
import MetricsPanel, { type Metrics } from "./MetricsPanel";
import BookingConfirmation from "./BookingConfirmation";

type SpaFlowState = {
    status: 'idle' | 'processing' | 'completed' | 'failed';
    currentStep: number;
    totalSteps: number;
    selectedCustomer: typeof spaCustomers[0] | null;
    completedSteps: string[];
    metrics: {
        startTime: Date;
        endTime?: Date;
        duration_seconds?: number;
        steps_completed: number;
        success_rate: number;
        custom_metrics: Record<string, number | string>;
    };
    selectedService: SpaService | null;
    selectedDate: string | null;
    selectedTime: string | null;
    bookingStep: 'idle' | 'selecting_service' | 'selecting_date' | 'selecting_time' | 'confirmed';
};

const INITIAL_STATE: SpaFlowState = {
    status: 'idle',
    currentStep: 0,
    totalSteps: 4,
    selectedCustomer: spaCustomers[0],
    completedSteps: [],
    metrics: {
        startTime: new Date(),
        steps_completed: 0,
        success_rate: 100,
        custom_metrics: {}
    },
    selectedService: null,
    selectedDate: null,
    selectedTime: null,
    bookingStep: 'idle'
};

export default function SpaDemo() {
    const [flowState, setFlowState] = useState<SpaFlowState>(INITIAL_STATE);
    const [messages, setMessages] = useState<Message[]>([]);
    const [rules, setRules] = useState<Rule[]>(spaBookingRules);
    const [activeRule, setActiveRule] = useState<Rule | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const messageQueueRef = useRef<MessageQueue | null>(null);

    // Initialize message queue
    useEffect(() => {
        messageQueueRef.current = new MessageQueue({
            onTypingStart: () => setIsTyping(true),
            onTypingEnd: () => setIsTyping(false),
            onMessageAdd: (message) => setMessages(prev => [...prev, message])
        });

        // Initial greeting
        addSystemMessage("Sistema listo. Escribí 'quiero turno' para comenzar la demo.");
    }, []);

    const addMessage = (role: Message["role"], text: string, metadata?: Message["metadata"]) => {
        const newMessage: Message = {
            id: `msg_${Date.now()}_${Math.random()}`,
            role,
            text,
            timestamp: new Date(),
            metadata
        };

        if (role === "bot" && messageQueueRef.current) {
            const delay = calculateTypingDelay(text);
            messageQueueRef.current.add(newMessage, delay, true);
        } else {
            setMessages(prev => [...prev, newMessage]);
        }
    };

    const addSystemMessage = (text: string) => {
        setMessages(prev => [...prev, {
            id: `msg_${Date.now()}_${Math.random()}`,
            role: "system",
            text,
            timestamp: new Date()
        }]);
    };

    const updateRuleStatus = (ruleId: string, status: Rule["status"]) => {
        setRules(prev =>
            prev.map(rule =>
                rule.id === ruleId ? { ...rule, status } : rule
            )
        );
    };

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Main booking flow
    const executeBookingFlow = async (userInput: string) => {
        const lowerInput = userInput.toLowerCase().trim();

        // Step 1: Detect booking intent
        if (flowState.bookingStep === 'idle' &&
            (lowerInput.includes('turno') || lowerInput.includes('reserva') || lowerInput.includes('agendar'))) {

            setActiveRule(rules[0]);
            updateRuleStatus('R-SPA-001', 'active');
            await sleep(300);

            addSystemMessage("Cliente solicita turno - Mostrando catálogo de servicios");
            addMessage("bot", spaMessageTemplates.greeting);

            updateRuleStatus('R-SPA-001', 'completed');
            setFlowState(prev => ({ ...prev, bookingStep: 'selecting_service', currentStep: 1 }));
            setActiveRule(null);
            return;
        }

        // Step 2: Service selection
        if (flowState.bookingStep === 'selecting_service') {
            const serviceNum = parseServiceInput(userInput, spaServices.length);

            if (serviceNum === null) {
                addMessage("bot", spaMessageTemplates.invalidService);
                addSystemMessage("⚠️ Cliente ingresó valor inválido para servicio");
                return;
            }

            setActiveRule(rules[1]);
            updateRuleStatus('R-SPA-002', 'active');
            await sleep(300);

            const selectedService = spaServices[serviceNum - 1];
            setFlowState(prev => ({ ...prev, selectedService, currentStep: 2 }));

            addSystemMessage(`Servicio seleccionado: ${selectedService.name}`);
            addMessage("bot", spaMessageTemplates.availableDays(selectedService.name));

            updateRuleStatus('R-SPA-002', 'completed');
            setFlowState(prev => ({ ...prev, bookingStep: 'selecting_date' }));
            setActiveRule(null);
            return;
        }

        // Step 3: Date selection
        if (flowState.bookingStep === 'selecting_date') {
            const parsedDate = parseDateInput(userInput, availableDates);

            if (parsedDate === null) {
                addMessage("bot", spaMessageTemplates.invalidDate);
                addSystemMessage("⚠️ Cliente ingresó fecha no disponible");
                return;
            }

            setActiveRule(rules[2]);
            updateRuleStatus('R-SPA-003', 'active');
            await sleep(300);

            const availableSlots = spaAvailability[parsedDate];
            setFlowState(prev => ({ ...prev, selectedDate: parsedDate, currentStep: 3 }));

            addSystemMessage(`Fecha seleccionada: ${formatDateDisplay(parsedDate)}`);
            addMessage("bot", spaMessageTemplates.availableTimes(formatDateDisplay(parsedDate), availableSlots));

            updateRuleStatus('R-SPA-003', 'completed');
            setFlowState(prev => ({ ...prev, bookingStep: 'selecting_time' }));
            setActiveRule(null);
            return;
        }

        // Step 4: Time selection and confirmation
        if (flowState.bookingStep === 'selecting_time' && flowState.selectedDate) {
            const availableSlots = spaAvailability[flowState.selectedDate];
            const parsedTime = parseTimeInput(userInput, availableSlots);

            if (parsedTime === null) {
                addMessage("bot", spaMessageTemplates.invalidTime);
                addSystemMessage("⚠️ Cliente ingresó horario ocupado");
                return;
            }

            setActiveRule(rules[3]);
            updateRuleStatus('R-SPA-004', 'active');
            await sleep(300);

            setFlowState(prev => ({ ...prev, selectedTime: parsedTime, currentStep: 4 }));

            const customer = flowState.selectedCustomer!;
            const service = flowState.selectedService!;
            const dateDisplay = formatDateDisplay(flowState.selectedDate);
            const timeDisplay = formatTimeDisplay(parsedTime);

            addSystemMessage(`✅ Turno confirmado para ${customer.name}`);
            addMessage("bot", spaMessageTemplates.confirmation(
                customer.name,
                dateDisplay,
                timeDisplay,
                service.name,
                service.price_ars
            ));

            updateRuleStatus('R-SPA-004', 'completed');
            setFlowState(prev => ({
                ...prev,
                bookingStep: 'confirmed',
                status: 'completed',
                completedSteps: ['R-SPA-001', 'R-SPA-002', 'R-SPA-003', 'R-SPA-004']
            }));

            setActiveRule(null);
            setShowConfirmation(true);
            return;
        }
    };

    const handleCommand = async (command: string) => {
        if (isProcessing) return;

        const lowerCommand = command.toLowerCase().trim();

        // Add user message
        addMessage("client", command);

        // Handle reset
        if (lowerCommand === "reset" || lowerCommand === "reiniciar") {
            handleReset();
            return;
        }

        setIsProcessing(true);

        try {
            await executeBookingFlow(command);
        } catch (error) {
            console.error("Error in flow:", error);
            addSystemMessage("❌ Error en el flujo - Intenta nuevamente");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        // Clear message queue
        messageQueueRef.current?.clear();

        // Reset state
        setFlowState(INITIAL_STATE);
        setMessages([]);
        setRules(spaBookingRules.map(r => ({ ...r, status: 'pending' })));
        setActiveRule(null);
        setIsTyping(false);
        setIsProcessing(false);
        setShowConfirmation(false);

        // Add initial message
        setTimeout(() => {
            addSystemMessage("Demo reiniciada. Escribí 'quiero turno' para comenzar.");
        }, 100);
    };

    // Mock metrics
    const metrics: Metrics = {
        total_bookings: 24,
        conversion_rate: 87,
        avg_response_time: 2,
        no_show_reduction: 65
    };

    return (
        <div className="min-h-screen bg-neutral-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
                        Demo: Reserva de Turnos Spa
                    </h1>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Flujo determinístico para agendar servicios de estética y spa
                    </p>
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-6">
                    {/* Left: Admin Panel */}
                    <div className="lg:col-span-1 space-y-4">
                        <AdminPanel
                            messages={messages}
                            events={[]}
                            onCommand={handleCommand}
                            isProcessing={isProcessing}
                        />
                        <MetricsPanel metrics={metrics} />
                    </div>

                    {/* Middle: Rules Display */}
                    <div className="lg:col-span-1">
                        {showConfirmation && flowState.selectedService && flowState.selectedDate && flowState.selectedTime ? (
                            <BookingConfirmation
                                booking={{
                                    customerName: flowState.selectedCustomer!.name,
                                    date: formatDateDisplay(flowState.selectedDate),
                                    time: formatTimeDisplay(flowState.selectedTime),
                                    service: flowState.selectedService.name,
                                    price: flowState.selectedService.price_ars,
                                    duration: flowState.selectedService.duration_minutes
                                }}
                            />
                        ) : (
                            <RulesDisplay rules={rules} currentRuleId={activeRule?.id} />
                        )}
                    </div>

                    {/* Right: Client Panel */}
                    <div className="lg:col-span-1">
                        <ClientPanelWithTyping
                            messages={messages}
                            clientName={flowState.selectedCustomer?.name || "Cliente"}
                            isTyping={isTyping}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-sm text-neutral-500 mb-3">
                        💡 Esta es una simulación 100% client-side. No se conecta a servicios reales.
                    </p>
                    <button
                        onClick={handleReset}
                        className="px-6 py-3 bg-nordia text-neutral-900 font-semibold rounded-xl hover:bg-nordia-dim transition-colors shadow-lg"
                    >
                        Reiniciar Demo
                    </button>
                </div>
            </div>
        </div>
    );
}
