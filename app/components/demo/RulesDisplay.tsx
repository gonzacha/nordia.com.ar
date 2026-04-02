"use client";

import { Rule } from "@/app/types/demo";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import Card from "../ui/Card";

type RulesDisplayProps = {
    rules: Rule[];
    currentRuleId?: string;
};

export default function RulesDisplay({ rules, currentRuleId }: RulesDisplayProps) {
    return (
        <Card className="p-6">
            <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-4">
                Flujo Determinístico
            </h3>
            <div className="space-y-3">
                {rules.map((rule) => {
                    const isActive = rule.id === currentRuleId;
                    const isCompleted = rule.status === "completed";
                    const isPending = rule.status === "pending";

                    return (
                        <div
                            key={rule.id}
                            className={`flex items-start gap-3 p-3 rounded-lg transition-all ${isActive ? "bg-nordia/10 border border-nordia" : ""
                                } ${isCompleted ? "opacity-60" : ""}`}
                        >
                            <div className="flex-shrink-0 mt-0.5">
                                {isCompleted && (
                                    <CheckCircle2 className="w-5 h-5 text-success" />
                                )}
                                {isActive && (
                                    <Loader2 className="w-5 h-5 text-nordia animate-spin" />
                                )}
                                {isPending && (
                                    <Circle className="w-5 h-5 text-neutral-300" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-neutral-900">
                                    {rule.condition}
                                </p>
                                <p className="text-sm text-neutral-600 mt-0.5">
                                    → {rule.action}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-200">
                <p className="text-xs text-neutral-500 italic">
                    ✓ Cada paso es predecible y trazable
                </p>
            </div>
        </Card>
    );
}
