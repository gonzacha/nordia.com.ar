"use client";

import { motion } from "framer-motion";

/**
 * Booking confirmation card with premium design
 * Shows after successful reservation
 */

type Booking = {
    customerName: string;
    date: string;
    time: string;
    service: string;
    price: number;
    duration: number;
};

type InfoRowProps = {
    icon: string;
    label: string;
    value: string;
};

function InfoRow({ icon, label, value }: InfoRowProps) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-xl">{icon}</span>
            <div className="flex-1">
                <p className="text-xs opacity-70">{label}</p>
                <p className="font-semibold">{value}</p>
            </div>
        </div>
    );
}

export default function BookingConfirmation({ booking }: { booking: Booking }) {
    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-nordia-light to-nordia-primary p-6 rounded-2xl text-neutral-900 shadow-lg"
        >
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="text-5xl mb-3"
                >
                    ✅
                </motion.div>

                <h3 className="text-2xl font-bold mb-2">¡Turno Confirmado!</h3>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mt-4 space-y-3 text-left">
                    <InfoRow icon="👤" label="Cliente" value={booking.customerName} />
                    <InfoRow icon="📅" label="Fecha" value={booking.date} />
                    <InfoRow icon="🕐" label="Hora" value={booking.time} />
                    <InfoRow icon="💆♀️" label="Servicio" value={booking.service} />
                    <InfoRow icon="⏱️" label="Duración" value={`${booking.duration} min`} />
                    <InfoRow icon="💰" label="Precio" value={`$${booking.price.toLocaleString()}`} />
                </div>

                <p className="text-sm mt-4 opacity-80">
                    📲 Te enviaremos un recordatorio 24hs antes
                </p>
            </div>
        </motion.div>
    );
}
