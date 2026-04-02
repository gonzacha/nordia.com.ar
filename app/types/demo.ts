// Message types
export type MessageRole = "system" | "admin" | "client" | "bot";

export type Message = {
    id: string;
    role: MessageRole;
    text: string;
    timestamp: Date;
    metadata?: {
        clientName?: string;
        clientId?: string;
        action?: string;
    };
};

// Rule types
export type Rule = {
    id: string;
    title?: string;
    description?: string;
    condition: string;
    action: string;
    status?: "pending" | "active" | "completed";
    priority?: number;
};

// Flow state types
export type FlowState =
    | "idle"
    | "identifying_clients"
    | "sending_messages"
    | "waiting_response"
    | "processing_response"
    | "confirming_conversion"
    | "completed";

// Client data
export type Client = {
    id: string;
    name: string;
    phone: string;
    lastPurchase: Date;
    daysSinceLastPurchase: number;
    totalPurchases: number;
    status: "dormant" | "active" | "responding" | "converted";
};

// Demo event
export type DemoEvent = {
    type: "admin_command" | "system_action" | "client_response" | "rule_triggered";
    timestamp: Date;
    description: string;
    data?: any;
};
