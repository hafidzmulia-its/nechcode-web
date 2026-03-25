import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl space-y-4", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--color-brand)]">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl leading-tight text-[color:var(--color-ink)] sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-8 text-[color:var(--color-ink-soft)]">
        {description}
      </p>
    </div>
  );
}
