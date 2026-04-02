"use client";

import Card from "../ui/Card";

/**
 * Metrics panel for admin view
 * Shows system performance and value metrics
 */

export type Metrics = {
    total_bookings: number;
    conversion_rate: number;
    avg_response_time: number;
    no_show_reduction: number;
};

type MetricCardProps = {
    label: string;
    value: string | number;
    trend?: string;
    inverted?: boolean;
};

function MetricCard({ label, value, trend, inverted = false }: MetricCardProps) {
    const isPositive = trend?.startsWith('+');
    const trendColor = inverted
        ? (isPositive ? 'text-red-500' : 'text-green-500')
        : (isPositive ? 'text-green-500' : 'text-red-500');

    return (
        <div className="bg-neutral-50 rounded-lg p-3">
            <p className="text-xs text-neutral-600 mb-1">{label}</p>
            <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-neutral-900">{value}</p>
                {trend && (
                    <span className={`text-xs font-semibold ${trendColor}`}>
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
}

export default function MetricsPanel({ metrics }: { metrics: Metrics }) {
    return (
        <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📊</span>
                <h3 className="font-heading font-semibold text-neutral-900">
                    Métricas del Sistema
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <MetricCard
                    label="Reservas hoy"
                    value={metrics.total_bookings}
                    trend="+12%"
                />
                <MetricCard
                    label="Tasa conversión"
                    value={`${metrics.conversion_rate}%`}
                    trend="+8%"
                />
                <MetricCard
                    label="Tiempo resp."
                    value={`${metrics.avg_response_time}s`}
                    trend="-45%"
                />
                <MetricCard
                    label="No-shows"
                    value={`-${metrics.no_show_reduction}%`}
                    trend="-60%"
                    inverted
                />
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-200">
                <p className="text-xs text-neutral-500">
                    💡 Sistema operando 24/7 sin intervención manual
                </p>
            </div>
        </Card>
    );
}
