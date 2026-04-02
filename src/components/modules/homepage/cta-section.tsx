// components/modules/homepage/cta-section.tsx
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 bg-zinc-50/50 dark:bg-zinc-950/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-zinc-950 py-20 px-6 sm:px-12 lg:px-20 text-center shadow-2xl border border-zinc-800">
          {/* Decorative Modern Grid Background */}
          <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[32px_32px]"></div>

          {/* Glowing Ambient Blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/40 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 translate-y-1/3 w-80 h-80 bg-red-500/30 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 w-64 h-64 bg-orange-600/20 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Core Content */}
          <ScrollReveal
            direction="up"
            className="relative z-10 max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Ready to satisfy your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-500">
                cravings?
              </span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium">
              Join thousands of happy customers. Get your favorite meals from
              top local restaurants delivered blazing fast, right to your
              doorstep.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-orange-500/25 transition-transform active:scale-95"
                asChild
              >
                <Link href="/">
                  Order Now <ShoppingBag className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full px-8 py-6 text-lg font-semibold border-zinc-700 text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-all active:scale-95 bg-zinc-900/50 backdrop-blur-xs"
                asChild
              >
                <Link href="/">
                  Explore Menu <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          {/* Badge */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-xs font-semibold text-zinc-300 tracking-wider uppercase">
              Open for delivery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
