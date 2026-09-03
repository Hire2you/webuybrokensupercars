type PlaceholderImageProps = {
  label: string;
  aspectRatio?: `${number}/${number}` | number;
  className?: string;
};

export default function PlaceholderImage({
  label,
  aspectRatio = "16/10",
  className = "",
}: PlaceholderImageProps) {
  const ratio =
    typeof aspectRatio === "number" ? String(aspectRatio) : aspectRatio;

  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center overflow-hidden rounded-md bg-placeholder ring-1 ring-red-primary/10 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span className="px-4 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-red-primary">
        {label}
      </span>
    </div>
  );
}
