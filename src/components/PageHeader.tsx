export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="mb-8 border-b border-border pb-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <h1 className="m-0 font-serif text-[1.625rem] font-normal leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[2rem]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 font-serif text-[0.9375rem] leading-[1.5] text-muted-foreground max-w-[56ch]">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex-shrink-0">{actions}</div>}
      </div>
    </header>
  );
}
