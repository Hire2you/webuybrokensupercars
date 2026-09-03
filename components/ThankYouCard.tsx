import Button from "./Button";

const TRUST_POINTS = [
  "Free nationwide collection",
  "Payment same day",
  "No obligation",
];

export default function ThankYouCard() {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-md border-2 border-red-primary bg-white p-5 shadow-[0_20px_45px_-25px_rgba(157,13,10,0.45)] sm:p-8">
      <div className="py-4 text-center sm:py-6">
        <p className="font-sans text-xl font-bold uppercase tracking-tight text-red-primary sm:text-2xl">
          We have your details
        </p>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-text-muted">
          Thanks. We will be in touch shortly with a no-obligation offer for
          your supercar.
        </p>
        <Button
          href="/#valuation"
          variant="primary"
          size="lg"
          fullWidth
          className="mt-6 flex"
        >
          Get another valuation
        </Button>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-text-muted">
          {TRUST_POINTS.map((point, index) => (
            <li key={point} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">·</span>}
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
