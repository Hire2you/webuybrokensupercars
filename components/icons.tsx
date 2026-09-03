import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ className, children, ...props }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CheckIcon({ className }: { className?: string }) {
  return (
    <Icon className={className} {...stroke} strokeWidth={2.25}>
      <path d="M5 12.5 9.5 17 19 7.5" />
    </Icon>
  );
}

export function ClipboardPenIcon({ className }: { className?: string }) {
  return (
    <Icon className={className} {...stroke}>
      <path d="M9 4h6" />
      <path d="M8 4.5H7A2 2 0 0 0 5 6.5v13A2 2 0 0 0 7 21.5h10a2 2 0 0 0 2-2v-13a2 2 0 0 0-2-2h-1" />
      <rect x="8" y="2.5" width="8" height="4" rx="1" />
      <path d="m14.2 12.2 2.1 2.1-4.8 1.3 1.3-4.8Z" />
    </Icon>
  );
}

export function CoinsIcon({ className }: { className?: string }) {
  return (
    <Icon className={className} {...stroke}>
      <circle cx="9" cy="9" r="6" />
      <path d="M15.5 8.2A6 6 0 1 1 8.2 15.5" />
      <path d="M9 7.2v3.6M7.4 9h3.2" />
    </Icon>
  );
}

export function TruckIcon({ className }: { className?: string }) {
  return (
    <Icon className={className} {...stroke}>
      <path d="M3 7.5h9.5v8H3z" />
      <path d="M12.5 11h4.2l2.8 3v1.5H12.5z" />
      <circle cx="7" cy="18" r="1.7" />
      <circle cx="17" cy="18" r="1.7" />
    </Icon>
  );
}

export function BanknoteIcon({ className }: { className?: string }) {
  return (
    <Icon className={className} {...stroke}>
      <rect x="3" y="6.5" width="18" height="11" rx="1.5" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M6 10v4M18 10v4" />
    </Icon>
  );
}

export function ShieldIcon({ className }: { className?: string }) {
  return (
    <Icon className={className} {...stroke}>
      <path d="M12 3.5 19 6.5v5.2c0 4.3-2.9 7.3-7 8.8-4.1-1.5-7-4.5-7-8.8V6.5z" />
      <path d="m9 12 2 2 4-4" />
    </Icon>
  );
}

export function FileCheckIcon({ className }: { className?: string }) {
  return (
    <Icon className={className} {...stroke}>
      <path d="M14 3.5H8A1.5 1.5 0 0 0 6.5 5v14A1.5 1.5 0 0 0 8 20.5h8a1.5 1.5 0 0 0 1.5-1.5V8z" />
      <path d="M14 3.5V8h4.5" />
      <path d="m9.5 13.5 1.8 1.8 3.4-3.6" />
    </Icon>
  );
}

export function BadgeCheckIcon({ className }: { className?: string }) {
  return (
    <Icon className={className} {...stroke}>
      <path d="m12 3 1.4 2.6 2.9.6-.6 2.9L18 11l-2.3 1.9.6 2.9-2.9.6L12 21l-1.4-2.6-2.9-.6.6-2.9L6 11l2.3-1.9-.6-2.9 2.9-.6z" />
      <path d="m9.5 11.2 1.7 1.7 3.3-3.4" />
    </Icon>
  );
}

export function HandshakeIcon({ className }: { className?: string }) {
  return (
    <Icon className={className} {...stroke}>
      <path d="M11 12.5 8.2 9.7a1.8 1.8 0 0 0-2.5 0L4 11.4" />
      <path d="m13 12.5 2.8-2.8a1.8 1.8 0 0 1 2.5 0L20 11.4" />
      <path d="M8 14.2 10.2 16a2 2 0 0 0 2.5.1L16 14.2" />
      <path d="M4 11.4v4.2M20 11.4v4.2" />
    </Icon>
  );
}

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        d="m12 3.2 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.6 7.2 18.1l.9-5.4-3.9-3.8 5.4-.8z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <Icon className={className} {...stroke}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}
