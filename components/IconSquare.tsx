import type { LucideIcon } from "lucide-react";

type IconSquareVariant = "light" | "solid" | "inverse" | "white";
type IconSquareSize = "sm" | "md";

type IconSquareProps = {
  icon: LucideIcon;
  variant?: IconSquareVariant;
  size?: IconSquareSize;
  iconSize?: number;
  strokeWidth?: number;
  className?: string;
  /** Enables group-hover colour transition on solid variant */
  interactive?: boolean;
};

const SIZE_CLASSES: Record<IconSquareSize, string> = {
  sm: "h-10 w-10",
  md: "h-11 w-11",
};

const VARIANT_CLASSES: Record<IconSquareVariant, string> = {
  light: "border border-red-primary/20 bg-red-primary/[0.08]",
  solid: "bg-red-primary",
  inverse: "bg-white/15",
  white: "bg-white",
};

export default function IconSquare({
  icon: Icon,
  variant = "light",
  size = "md",
  iconSize = size === "sm" ? 22 : 26,
  strokeWidth = 2.25,
  className = "",
  interactive = false,
}: IconSquareProps) {
  const iconColor =
    variant === "white"
      ? "var(--bg-dark)"
      : variant === "solid" || variant === "inverse"
        ? "#ffffff"
        : "var(--red-primary)";
  const iconClass =
    variant === "white"
      ? "text-bg-dark"
      : variant === "solid" || variant === "inverse"
        ? "text-white"
        : "text-red-primary";

  const interactiveClasses =
    variant === "solid" && interactive
      ? "transition-colors duration-200 group-hover:bg-red-bright motion-reduce:transition-none"
      : "";

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-sm ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${interactiveClasses} ${className}`}
    >
      <Icon
        size={iconSize}
        strokeWidth={strokeWidth}
        aria-hidden
        className={iconClass}
        color={iconColor}
      />
    </span>
  );
}
