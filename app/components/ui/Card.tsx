import { ReactNode } from "react";

type CardProps = {
    children: ReactNode;
    variant?: "default" | "hover" | "bordered";
    className?: string;
    onClick?: () => void;
};

export default function Card({
    children,
    variant = "default",
    className = "",
    onClick
}: CardProps) {
    const baseStyles = "rounded-xl transition-all duration-300";

    const variantStyles = {
        default: "bg-white border border-neutral-200",
        hover: "bg-white border border-neutral-200 hover:border-nordia hover:shadow-lg cursor-pointer",
        bordered: "bg-white border-2 border-neutral-200"
    };

    return (
        <div
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
