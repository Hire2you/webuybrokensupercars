import Image from "next/image";

export default function CarShowcase() {
  return (
    <div className="relative z-10 mx-auto -mt-6 w-full max-w-5xl sm:-mt-12 lg:-mt-20 lg:max-w-[60rem]">
      <Image
        src="/supercar-hero.webp"
        alt="Lamborghini, Ferrari and Bentley supercars — models we buy running or non-running"
        width={2000}
        height={900}
        priority
        quality={90}
        sizes="(max-width: 1024px) 100vw, 960px"
        className="mx-auto h-auto w-full"
      />
    </div>
  );
}
