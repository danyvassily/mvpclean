import { cn } from "@/lib/utils";

type SectionTitleProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionTitle({ 
  kicker, 
  title, 
  subtitle, 
  align = 'center',
  className 
}: SectionTitleProps) {
  return (
    <div className={cn(
      "space-y-12",
      align === 'center' ? 'text-center' : 'text-left',
      className
    )}>
      {kicker && (
        <div className="inline-block px-8 py-4 bg-gradient-to-r from-slate-50 to-slate-100 text-slate-800 text-xs font-bold tracking-[0.2em] uppercase border border-slate-200/60 shadow-sm">
          {kicker}
        </div>
      )}
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light leading-[1.1] text-slate-900 tracking-[0.02em] mb-8">
        {title}
      </h1>
      
      {subtitle && (
        <div className="max-w-3xl mx-auto">
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-600 font-light tracking-wide">
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
}
