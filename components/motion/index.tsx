"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  COUNT_UP_DURATION,
  createGroupVariants,
  createLineVariants,
  createNumeralVariants,
  createRevealFromVariants,
  createRevealVariants,
  createSettleImageVariants,
  EASE,
  HERO_CAR_Y,
  HERO_ENTRANCE_DURATION,
  HERO_FORM_SCALE_FROM,
  parseCountValue,
  REVEAL_X,
  REVEAL_X_MOBILE,
  REVEAL_Y,
  REVEAL_Y_MOBILE,
  VIEWPORT,
  type ParsedCount,
} from "@/lib/motion";

const MOBILE_QUERY = "(max-width: 640px)";

function subscribeToMobileViewport(onStoreChange: () => void) {
  const media = window.matchMedia(MOBILE_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getIsMobileViewport() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

function useRevealDistance() {
  const reducedMotion = useReducedMotion();
  const isMobile = useSyncExternalStore(
    subscribeToMobileViewport,
    getIsMobileViewport,
    () => false,
  );
  const y = reducedMotion ? 0 : isMobile ? REVEAL_Y_MOBILE : REVEAL_Y;
  const x = reducedMotion ? 0 : isMobile ? REVEAL_X_MOBILE : REVEAL_X;

  return { y, x, reducedMotion };
}

export type TriggerMode = "viewport" | "mount";

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  trigger?: TriggerMode;
  delay?: number;
};

export function Reveal({
  children,
  className,
  trigger = "viewport",
  delay = 0,
  ...props
}: RevealProps) {
  const { y, reducedMotion } = useRevealDistance();
  const variants = createRevealVariants(reducedMotion, y);

  const motionProps =
    trigger === "mount"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: VIEWPORT,
        };

  return (
    <motion.div
      className={className}
      variants={variants}
      transition={{ delay }}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  trigger?: TriggerMode;
  as?: keyof typeof motion;
};

export function RevealGroup({
  children,
  className,
  trigger = "viewport",
  as = "div",
  ...props
}: RevealGroupProps) {
  const reducedMotion = useReducedMotion();
  const variants = createGroupVariants(reducedMotion);
  const Component = (motion[as] ?? motion.div) as typeof motion.div;

  const motionProps =
    trigger === "mount"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: VIEWPORT,
        };

  return (
    <Component
      className={className}
      variants={variants}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
}

type RevealItemProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  as?: keyof typeof motion;
};

export function RevealItem({
  children,
  className,
  as = "div",
  ...props
}: RevealItemProps) {
  const { y, reducedMotion } = useRevealDistance();
  const variants = createRevealVariants(reducedMotion, y);
  const Component = (motion[as] ?? motion.div) as typeof motion.div;

  return (
    <Component className={className} variants={variants} {...props}>
      {children}
    </Component>
  );
}

type RevealFromProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  direction: "left" | "right";
  trigger?: TriggerMode;
};

export function RevealFrom({
  children,
  className,
  direction,
  trigger = "viewport",
  ...props
}: RevealFromProps) {
  const { x, reducedMotion } = useRevealDistance();
  const variants = createRevealFromVariants(reducedMotion, direction, x);

  const motionProps =
    trigger === "mount"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: VIEWPORT,
        };

  return (
    <motion.div
      className={className}
      variants={variants}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealNumeral({
  children,
  className,
  ...props
}: HTMLMotionProps<"span"> & { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const variants = createNumeralVariants(reducedMotion);

  return (
    <motion.span className={className} variants={variants} {...props}>
      {children}
    </motion.span>
  );
}

type SettleImageProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  trigger?: TriggerMode;
};

export function SettleImage({
  children,
  className,
  trigger = "viewport",
  inherit = false,
  ...props
}: SettleImageProps & { inherit?: boolean }) {
  const reducedMotion = useReducedMotion();
  const variants = createSettleImageVariants(reducedMotion);

  if (inherit) {
    return (
      <motion.div
        className={`overflow-hidden ${className ?? ""}`}
        variants={variants}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  const motionProps =
    trigger === "mount"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: VIEWPORT,
        };

  return (
    <motion.div
      className={`overflow-hidden ${className ?? ""}`}
      variants={variants}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type RevealLineProps = HTMLMotionProps<"div"> & {
  origin?: "left" | "center" | "right";
};

export function RevealLine({
  className,
  origin = "left",
  ...props
}: RevealLineProps) {
  const reducedMotion = useReducedMotion();
  const variants = createLineVariants(reducedMotion);
  const originClass =
    origin === "center"
      ? "origin-center"
      : origin === "right"
        ? "origin-right"
        : "origin-left";

  return (
    <motion.div
      className={`${originClass} ${className ?? ""}`}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...props}
    />
  );
}

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
};

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  duration = COUNT_UP_DURATION,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, VIEWPORT);
  const reducedMotion = useReducedMotion();

  const format = (n: number) =>
    `${prefix}${decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString()}${suffix}`;

  const [display, setDisplay] = useState(() =>
    reducedMotion ? format(value) : format(0),
  );

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(format(value));
      return;
    }

    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(format(latest)),
    });

    return () => controls.stop();
  }, [decimals, duration, isInView, prefix, reducedMotion, suffix, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

type CountUpTextProps = {
  text: string;
  parsed: ParsedCount;
  className?: string;
};

export function CountUpText({ text, parsed, className }: CountUpTextProps) {
  return (
    <CountUp
      value={parsed.value}
      prefix={parsed.prefix}
      suffix={parsed.suffix}
      decimals={parsed.decimals}
      className={className}
    />
  );
}

export function CountUpFromText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const parsed = parseCountValue(text);

  if (!parsed) {
    return <span className={className}>{text}</span>;
  }

  return <CountUpText text={text} parsed={parsed} className={className} />;
}

type HeroEntranceProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade-up" | "scale-in" | "car-rise";
};

export function HeroEntrance({
  children,
  className,
  delay = 0,
  variant = "fade-up",
}: HeroEntranceProps) {
  const reducedMotion = useReducedMotion();

  const variants: Variants =
    variant === "scale-in"
      ? {
          hidden: reducedMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: HERO_FORM_SCALE_FROM },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: HERO_ENTRANCE_DURATION,
              ease: EASE,
              delay,
            },
          },
        }
      : variant === "car-rise"
        ? {
            hidden: reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: HERO_CAR_Y },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: HERO_ENTRANCE_DURATION,
                ease: EASE,
                delay,
              },
            },
          }
        : createRevealVariants(reducedMotion, REVEAL_Y);

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={variant === "fade-up" ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function HeroRoadLine({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`origin-center ${className ?? ""}`}
      initial={reducedMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0.5 }}
      animate={reducedMotion ? { opacity: 1 } : { scaleX: 1, opacity: 1 }}
      transition={{
        duration: HERO_ENTRANCE_DURATION,
        ease: EASE,
        delay,
      }}
    />
  );
}

export { useReducedMotion as useMotionPrefs };
