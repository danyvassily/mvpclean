"use client";

import { TransitionLink } from "@/components/gsap/TransitionLink";
import { cn } from "@/lib/utils";

interface CTAItem {
  text: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface CTAGroupProps {
  items: CTAItem[];
  className?: string;
}

export function CTAGroup({ items, className }: CTAGroupProps) {
  return (
    <section className={cn("py-16 lg:py-24 bg-slate-50", className)}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {items.map((item, index) => (
            <TransitionLink
              key={index}
              href={item.href}
              className={cn(
                "inline-flex items-center justify-center min-h-[44px] px-8 py-4 font-medium text-lg tracking-wide transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2",
                item.variant === "primary"
                  ? "bg-slate-700 hover:bg-slate-800 text-white focus:ring-slate-400"
                  : "bg-white hover:bg-slate-100 border-2 border-slate-300 hover:border-slate-400 text-slate-900 focus:ring-slate-400"
              )}
            >
              {item.text}
            </TransitionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
