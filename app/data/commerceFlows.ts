import { Client, Rule } from "../types/demo";

// Mock dormant clients
export const mockDormantClients: Client[] = [
    {
        id: "client_001",
        name: "María González",
        phone: "+54 9 11 2345-6789",
        lastPurchase: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000), // 75 days ago
        daysSinceLastPurchase: 75,
        totalPurchases: 8,
        status: "dormant"
    },
    {
        id: "client_002",
        name: "Carlos Rodríguez",
        phone: "+54 9 11 3456-7890",
        lastPurchase: new Date(Date.now() - 92 * 24 * 60 * 60 * 1000), // 92 days ago
        daysSinceLastPurchase: 92,
        totalPurchases: 5,
        status: "dormant"
    }
];

// Reactivation flow rules
export const reactivationRules: Rule[] = [
    {
        id: "rule_001",
        condition: "Cliente sin compra en 60+ días",
        action: "Identificar clientes dormidos",
        status: "pending"
    },
    {
        id: "rule_002",
        condition: "Cliente identificado",
        action: "Enviar mensaje personalizado con oferta 15% OFF",
        status: "pending"
    },
    {
        id: "rule_003",
        condition: "Cliente responde con interés",
        action: "Ofrecer descuento y link de compra",
        status: "pending"
    },
    {
        id: "rule_004",
        condition: "Cliente acepta oferta",
        action: "Confirmar pedido y registrar conversión",
        status: "pending"
    }
];

// Message templates
export const messageTemplates = {
    reactivation: (clientName: string) =>
        `Hola ${clientName}! 👋\n\nTe extrañamos en ElectroHogar. Tenemos una oferta especial para vos:\n\n🎁 15% OFF en toda la tienda\n⚡ Válido por 48hs\n\n¿Te interesa?`,

    offerDetails: () =>
        `Perfecto! 🎉\n\nTu código de descuento: VUELVE15\n\nPodés usarlo en cualquier producto de nuestro catálogo.\n\nLink para comprar: electrohogar.com/ofertas\n\n¿Querés que te ayude con algo específico?`,

    confirmation: (productName: string = "heladera Samsung") =>
        `Excelente elección! ✅\n\nConfirmamos tu pedido:\n- ${productName}\n- Descuento 15% aplicado\n- Envío gratis\n\nTe llegará en 2-3 días hábiles.\n\n¡Gracias por tu compra!`
};

// Client responses (simulated)
export const clientResponses = {
    interested: "Sí, me interesa! Qué productos tienen en oferta?",
    acceptOffer: "Genial! Me compro una heladera que estaba viendo",
    thankYou: "Perfecto, gracias!"
};
