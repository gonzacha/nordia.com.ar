"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type FadeInProps = {
    children: ReactNode;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    className?: string;
};

export default function FadeIn({
    children,
    delay = 0,
    duration = 600,
    direction = "up",
    className = ""
}: FadeInProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    const getTransform = () => {
        if (!isVisible) {
            switch (direction) {
                case "up": return "translateY(20px)";
                case "down": return "translateY(-20px)";
                case "left": return "translateX(20px)";
                case "right": return "translateX(-20px)";
                default: return "none";
            }
        }
        return "none";
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`
            }}
        >
            {children}
        </div>
    );
}
