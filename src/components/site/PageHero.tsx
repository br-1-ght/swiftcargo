interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
}

export function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/70 to-ink/40" />
      </div>
      <div className="container mx-auto px-4 py-20 text-white md:py-28">
        {eyebrow && (
          <span className="inline-flex items-center rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-foreground">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-lg text-white/80">{description}</p>}
      </div>
    </section>
  );
}
