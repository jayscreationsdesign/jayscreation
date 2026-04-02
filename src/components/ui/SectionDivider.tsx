"use client";

interface SectionDividerProps {
  className?: string;
  variant?: "default" | "subtle" | "elegant";
  thickness?: "thin" | "medium" | "thick";
}

export function SectionDivider({ 
  className = "", 
  variant = "default",
  thickness = "medium"
}: SectionDividerProps) {
  const getThicknessClasses = () => {
    switch (thickness) {
      case "thin":
        return "h-px";
      case "thick":
        return "h-1";
      case "medium":
      default:
        return "h-0.5";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "subtle":
        return "opacity-60";
      case "elegant":
        return "opacity-80 shadow-sm";
      case "default":
      default:
        return "opacity-90 shadow-md";
    }
  };

  return (
    <div className={`w-full flex items-center justify-center my-12 ${className}`}>
      <div 
        className={`
          w-full max-w-4xl 
          ${getThicknessClasses()} 
          rounded-full
          ${getVariantClasses()}
          transition-all duration-300
        `}
        style={{
          background: "linear-gradient(90deg, #8B4513, #B8954A, #8B4513)",
          boxShadow: variant === "elegant" 
            ? "0 2px 8px rgba(200, 169, 110, 0.3)" 
            : variant === "default" 
            ? "0 4px 12px rgba(200, 169, 110, 0.4)"
            : "none"
        }}
      />
    </div>
  );
}
