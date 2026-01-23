"use client";

type SpinnerVariant = "spinner" | "logo" | "skeleton";
type SpinnerSize = "sm" | "md" | "lg";

type LoadingSpinnerProps = {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  className?: string;
  text?: string;
};

const sizeClasses: Record<SpinnerSize, { spinner: string; logo: string; text: string }> = {
  sm: {
    spinner: "w-5 h-5 border-2",
    logo: "w-8 h-8 text-sm",
    text: "text-xs",
  },
  md: {
    spinner: "w-8 h-8 border-3",
    logo: "w-12 h-12 text-lg",
    text: "text-sm",
  },
  lg: {
    spinner: "w-12 h-12 border-4",
    logo: "w-16 h-16 text-2xl",
    text: "text-base",
  },
};

// Classic spinner variant
function SpinnerVariant({ size = "md" }: { size: SpinnerSize }) {
  return (
    <div
      className={`${sizeClasses[size].spinner} rounded-full border-neutral-700 border-t-[#00ff88] animate-spin`}
    />
  );
}

// Logo variant with pulse
function LogoVariant({ size = "md" }: { size: SpinnerSize }) {
  return (
    <div className="relative">
      {/* Pulse ring */}
      <div
        className={`absolute inset-0 ${sizeClasses[size].logo} rounded-xl bg-[#00ff88]/20 animate-ping`}
      />
      {/* Logo */}
      <div
        className={`relative ${sizeClasses[size].logo} rounded-xl bg-[#00ff88] flex items-center justify-center animate-pulse`}
      >
        <span className="text-neutral-900 font-bold">N</span>
      </div>
    </div>
  );
}

// Skeleton variant
function SkeletonVariant({ size = "md" }: { size: SpinnerSize }) {
  const heightClasses: Record<SpinnerSize, string> = {
    sm: "h-4",
    md: "h-6",
    lg: "h-8",
  };

  return (
    <div className="w-full space-y-3">
      <div
        className={`${heightClasses[size]} bg-neutral-800 rounded-lg animate-pulse`}
        style={{ width: "75%" }}
      />
      <div
        className={`${heightClasses[size]} bg-neutral-800 rounded-lg animate-pulse`}
        style={{ width: "100%" }}
      />
      <div
        className={`${heightClasses[size]} bg-neutral-800 rounded-lg animate-pulse`}
        style={{ width: "60%" }}
      />
    </div>
  );
}

export default function LoadingSpinner({
  variant = "spinner",
  size = "md",
  className = "",
  text,
}: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      {variant === "spinner" && <SpinnerVariant size={size} />}
      {variant === "logo" && <LogoVariant size={size} />}
      {variant === "skeleton" && <SkeletonVariant size={size} />}

      {text && variant !== "skeleton" && (
        <p className={`text-neutral-400 ${sizeClasses[size].text}`}>{text}</p>
      )}
    </div>
  );
}

// Export individual variants for direct use
export { SpinnerVariant, LogoVariant, SkeletonVariant };
