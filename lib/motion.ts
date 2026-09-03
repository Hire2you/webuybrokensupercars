import type { Transition, Variants } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const REVEAL_DURATION = 0.6;
export const REVEAL_Y = 24;
export const REVEAL_Y_MOBILE = 18;
export const REVEAL_X = 28;
export const REVEAL_X_MOBILE = 20;
export const STAGGER_CHILDREN = 0.1;
export const VIEWPORT = { once: true, amount: 0.2 } as const;

export const HOVER_DURATION = 0.22;
export const HOVER_EASE = EASE;

export const COUNT_UP_DURATION = 1.2;
export const SETTLE_SCALE_FROM = 1.06;
export const NUMERAL_REVEAL_Y = 36;
export const NUMERAL_DELAY = 0.1;

export const HERO_ENTRANCE_DURATION = 0.5;
export const HERO_FORM_SCALE_FROM = 0.98;
export const HERO_CAR_Y = 30;

export function revealTransition(delay = 0): Transition {
  return {
    duration: REVEAL_DURATION,
    ease: EASE,
    delay,
  };
}

export function createRevealVariants(
  reducedMotion: boolean | null,
  y = REVEAL_Y,
): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: revealTransition(),
      },
    };
  }

  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: revealTransition(),
    },
  };
}

export function createRevealFromVariants(
  reducedMotion: boolean | null,
  direction: "left" | "right",
  x = REVEAL_X,
): Variants {
  const offset = direction === "left" ? -x : x;

  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: revealTransition(),
      },
    };
  }

  return {
    hidden: { opacity: 0, x: offset },
    visible: {
      opacity: 1,
      x: 0,
      transition: revealTransition(),
    },
  };
}

export function createNumeralVariants(
  reducedMotion: boolean | null,
  y = NUMERAL_REVEAL_Y,
): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: revealTransition(),
      },
    };
  }

  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: REVEAL_DURATION,
        ease: EASE,
        delay: NUMERAL_DELAY,
      },
    },
  };
}

export function createSettleImageVariants(
  reducedMotion: boolean | null,
): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: revealTransition(),
      },
    };
  }

  return {
    hidden: { opacity: 0, scale: SETTLE_SCALE_FROM },
    visible: {
      opacity: 1,
      scale: 1,
      transition: revealTransition(),
    },
  };
}

export function createLineVariants(reducedMotion: boolean | null): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: revealTransition(),
      },
    };
  }

  return {
    hidden: { scaleX: 0, opacity: 0.6 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: revealTransition(),
    },
  };
}

export function createGroupVariants(
  reducedMotion: boolean | null,
  stagger = STAGGER_CHILDREN,
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : stagger,
      },
    },
  };
}

export type ParsedCount = {
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
};

export function parseCountValue(text: string): ParsedCount | null {
  const match = text.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, num, suffix] = match;
  const value = Number.parseFloat(num);
  const decimals = num.includes(".") ? (num.split(".")[1]?.length ?? 0) : 0;

  return { value, prefix, suffix, decimals };
}
