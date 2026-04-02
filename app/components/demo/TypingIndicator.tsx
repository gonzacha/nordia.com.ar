"use client";

/**
 * Typing indicator component - WhatsApp style
 * Shows animated dots when bot is "typing"
 */

export default function TypingIndicator() {
    return (
        <div className="flex justify-start">
            <div className="bg-white border border-neutral-200 rounded-2xl px-4 py-3 w-fit">
                <div className="flex items-center gap-1">
                    <span
                        className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0ms', animationDuration: '1s' }}
                    />
                    <span
                        className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                        style={{ animationDelay: '150ms', animationDuration: '1s' }}
                    />
                    <span
                        className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                        style={{ animationDelay: '300ms', animationDuration: '1s' }}
                    />
                </div>
            </div>
        </div>
    );
}
