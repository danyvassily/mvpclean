import { cn } from "@/lib/utils";

type TextBlockProps = {
  kicker?: string;
  title: string;
  body: string;
  align?: 'left' | 'center';
  className?: string;
};

export function TextBlock({ 
  kicker, 
  title, 
  body, 
  align = 'left',
  className 
}: TextBlockProps) {
  return (
    <div className={cn(
      "space-y-10 max-w-4xl",
      align === 'center' ? 'mx-auto text-center' : 'text-left',
      className
    )}>
      {kicker && (
        <div className={cn(
          "inline-block px-8 py-4 bg-gradient-to-r from-slate-50 to-slate-100 text-slate-800 text-xs font-bold tracking-[0.2em] uppercase border border-slate-200/60 shadow-sm",
          align === 'center' ? 'mx-auto' : ''
        )}>
          {kicker}
        </div>
      )}
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-light text-slate-900 tracking-[0.02em] leading-[1.1] mb-8">
        {title}
      </h2>
      
      <div className="prose prose-lg lg:prose-xl max-w-none">
        <p className="text-lg md:text-xl leading-relaxed text-slate-600 font-light tracking-wide">
          {body}
        </p>
      </div>
    </div>
  );
}
