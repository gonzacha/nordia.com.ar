import { Rule } from "../types/demo";

/**
 * Spa/Estética specific data
 * Services, availability, customers, and flow rules
 */

// Services offered
export type SpaService = {
    id: string;
    name: string;
    duration_minutes: number;
    price_ars: number;
    emoji: string;
    category: string;
    description?: string;
};

export const spaServices: SpaService[] = [
    {
        id: 'srv_spa_001',
        name: 'Limpieza facial profunda',
        duration_minutes: 60,
        price_ars: 15000,
        emoji: '🧖♀️',
        category: 'facial',
        description: 'Limpieza profunda con extracción y máscara'
    },
    {
        id: 'srv_spa_002',
        name: 'Masaje relajante',
        duration_minutes: 90,
        price_ars: 18000,
        emoji: '💆♀️',
        category: 'corporal',
        description: 'Masaje de cuerpo completo con aceites esenciales'
    },
    {
        id: 'srv_spa_003',
        name: 'Depilación completa',
        duration_minutes: 45,
        price_ars: 12000,
        emoji: '✨',
        category: 'depilacion',
        description: 'Depilación con cera de piernas completas'
    },
    {
        id: 'srv_spa_004',
        name: 'Manicura + Pedicura',
        duration_minutes: 60,
        price_ars: 10000,
        emoji: '💅',
        category: 'manos_pies',
        description: 'Esmaltado semipermanente incluido'
    }
];

// Availability calendar (mock data)
export const spaAvailability: Record<string, string[]> = {
    '2026-02-13': ['10:00', '14:00', '16:00', '18:00'],
    '2026-02-14': ['10:00', '14:00', '16:00'],
    '2026-02-17': ['10:00', '12:00', '14:00', '16:00', '18:00'],
    '2026-02-18': ['12:00', '16:00', '18:00']
};

// Available dates list
export const availableDates = Object.keys(spaAvailability);

// Mock customers
export type SpaCustomer = {
    id: string;
    name: string;
    phone: string;
    email?: string;
    preferred_service?: string;
    last_visit?: string;
    total_visits: number;
    loyalty_tier: 'bronze' | 'silver' | 'gold' | 'platinum';
    notes?: string;
};

export const spaCustomers: SpaCustomer[] = [
    {
        id: 'cust_spa_001',
        name: 'Valentina Martínez',
        phone: '+54 9 11 2345-6789',
        email: 'valentina.m@email.com',
        preferred_service: 'srv_spa_001',
        last_visit: '2026-01-20',
        total_visits: 12,
        loyalty_tier: 'gold',
        notes: 'Prefiere música relajante'
    },
    {
        id: 'cust_spa_002',
        name: 'Carolina López',
        phone: '+54 9 11 3456-7890',
        email: 'carolina.l@email.com',
        preferred_service: 'srv_spa_002',
        last_visit: '2026-01-28',
        total_visits: 8,
        loyalty_tier: 'silver',
        notes: 'Alérgica a fragancias fuertes'
    }
];

// Booking flow rules
export const spaBookingRules: Rule[] = [
    {
        id: 'R-SPA-001',
        title: 'Identificar intención de reserva',
        description: 'Cliente solicita turno',
        condition: 'Mensaje contiene "turno" OR "reserva" OR "agendar"',
        action: 'Mostrar catálogo de servicios',
        status: 'pending',
        priority: 1
    },
    {
        id: 'R-SPA-002',
        title: 'Validar servicio seleccionado',
        description: 'Cliente elige servicio del menú',
        condition: 'Respuesta es número 1-4',
        action: 'Mostrar disponibilidad de días',
        status: 'pending',
        priority: 2
    },
    {
        id: 'R-SPA-003',
        title: 'Validar día seleccionado',
        description: 'Cliente elige fecha disponible',
        condition: 'Día está en lista de disponibles',
        action: 'Mostrar horarios libres ese día',
        status: 'pending',
        priority: 3
    },
    {
        id: 'R-SPA-004',
        title: 'Confirmar reserva',
        description: 'Cliente elige horario y se confirma',
        condition: 'Horario está libre',
        action: 'Bloquear horario + Enviar confirmación',
        status: 'pending',
        priority: 4
    }
];

// Reminder flow rules
export const spaReminderRules: Rule[] = [
    {
        id: 'R-SPA-R01',
        title: 'Detectar turno próximo',
        description: 'Sistema identifica turno en 24hs',
        condition: 'Turno en exactamente 24 horas',
        action: 'Enviar recordatorio con opciones',
        status: 'pending',
        priority: 1
    },
    {
        id: 'R-SPA-R02',
        title: 'Procesar confirmación',
        description: 'Cliente confirma asistencia',
        condition: 'Cliente responde "1" (confirmar)',
        action: 'Marcar turno como confirmado',
        status: 'pending',
        priority: 2
    }
];

// Message templates
export const spaMessageTemplates = {
    greeting: `Hola! 👋 Bienvenida a Belleza & Spa.

¿Para qué servicio querés agendar?

1️⃣ Limpieza facial profunda (60 min - $15.000)
2️⃣ Masaje relajante (90 min - $18.000)
3️⃣ Depilación completa (45 min - $12.000)
4️⃣ Manicura + Pedicura (60 min - $10.000)

Respondé con el número.`,

    availableDays: (serviceName: string) => `Perfecto! ${serviceName} 🧖♀️

¿Qué día te viene bien?

📅 Días disponibles:
- Jueves 13/02
- Viernes 14/02
- Lunes 17/02
- Martes 18/02

Escribí el día (ej: "jueves 13")`,

    availableTimes: (date: string, slots: string[]) => `${date} 📅

Horarios disponibles:
${slots.map(slot => `🕐 ${slot}`).join('\n')}

¿Cuál preferís?`,

    confirmation: (customerName: string, date: string, time: string, service: string, price: number) =>
        `✅ Turno confirmado!

📋 Resumen:
👤 ${customerName}
📅 ${date} - ${time}
💆♀️ ${service}
⏱️ Duración: 60 min
💰 Precio: $${price.toLocaleString()}

Te envío recordatorio 24hs antes.

Para cancelar, escribí: "cancelar turno"

¡Nos vemos! 🌸`,

    reminder: (date: string, time: string, service: string) =>
        `Hola! 👋

Te recordamos tu turno mañana:

📅 ${date} - ${time}
💆♀️ ${service}
📍 Belleza & Spa - Av. Corrientes 1234

¿Confirmás tu asistencia?

1️⃣ Sí, confirmo
2️⃣ Necesito reprogramar
3️⃣ Quiero cancelar`,

    reminderConfirmed: `✅ Perfecto! Turno confirmado.

Nos vemos mañana 🌸

Si surge algo, avisanos con tiempo.`,

    invalidService: `No entendí. Por favor respondé con el número del servicio (1-4)`,

    invalidDate: `Ese día no está disponible. Por favor elegí uno de los días de la lista.`,

    invalidTime: `Ese horario no está libre. Por favor elegí uno de los horarios disponibles.`
};
