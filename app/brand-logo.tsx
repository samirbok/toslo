import Image from "next/image";

export default function BrandLogo({ className = "size-16" }: { className?: string }) {
  return <Image src="/logo.svg" alt="Toslo" width={1080} height={1080} unoptimized className={`${className} shrink-0 object-contain`} />;
}
