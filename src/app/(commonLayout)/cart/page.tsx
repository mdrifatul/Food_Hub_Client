"use client";

import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useCart } from "@/context/CartContext";
import {
  ArrowRight,
  ChevronLeft,
  CreditCard,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CartPage() {
  const { items, removeItem, totalPrice } = useCart();

  useEffect(() => {
    document.title = "Shopping Cart | FoodHub";
  }, []);

  // EMPTY STATE
  if (items.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center bg-transparent relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-zinc-200/50 dark:bg-zinc-800/30 blur-[100px] rounded-full pointer-events-none"></div>
        <ScrollReveal
          direction="up"
          className="relative z-10 flex flex-col items-center text-center max-w-md px-4"
        >
          <div className="w-20 h-20 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 border border-zinc-200 shadow-xl shadow-zinc-200/50 dark:shadow-none dark:border-zinc-800 group">
            <ShoppingBag className="w-8 h-8 text-zinc-400 group-hover:scale-110 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-all duration-300" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-8 text-base">
            Looks like you haven't added any delicious meals to your cart yet.
            Let's fix that!
          </p>
          <Button
            asChild
            className="rounded-xl bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg shadow-orange-500/20 dark:shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 dark:hover:shadow-orange-500/30 hover:-translate-y-0.5 px-8 h-12 text-base font-semibold transition-all duration-300 border-0"
          >
            <Link href="/">Explore Menu</Link>
          </Button>
        </ScrollReveal>
      </div>
    );
  }

  // PREMIUM CART LAYOUT
  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/20 relative pb-20 overflow-hidden">
      {/* Subtle Premium Glow */}
      <div className="absolute top-0 right-0 w-full h-125 bg-linear-to-b from-zinc-200/50 to-transparent dark:from-zinc-800/30 pointer-events-none blur-3xl"></div>

      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-6xl relative z-10">
        {/* HEADER SECTION */}
        <ScrollReveal
          direction="down"
          className="flex items-center gap-4 mb-8 lg:mb-12"
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all hover:-translate-x-1"
            asChild
          >
            <Link href="/">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-500">
            Your Cart
          </h1>
          <div className="ml-auto bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-foreground px-4 py-1.5 rounded-full text-sm font-semibold">
            {items.length} {items.length === 1 ? "Item" : "Items"}
          </div>
        </ScrollReveal>

        {/* 2-COLUMN GRID SYSTEM */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* CART ITEMS LIST (LEFT COLUMN) */}
          <ScrollReveal
            direction="left"
            delay={0.1}
            className="lg:col-span-2 space-y-4 lg:space-y-6"
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 lg:gap-6 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-800 p-4 lg:p-5 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 group"
              >
                {/* Item Image */}
                {item.imageUrl && (
                  <div className="relative h-24 w-24 lg:h-32 lg:w-32 shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-950 rounded-xl">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Item Details */}
                <div className="flex-1 flex flex-col pt-1">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-semibold text-lg lg:text-xl text-foreground leading-tight mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Quantity:{" "}
                        <span className="font-medium text-foreground">
                          {item.quantity}
                        </span>
                      </p>
                    </div>
                    <p className="font-semibold text-lg lg:text-xl text-foreground shrink-0 mt-0.5">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Item Actions */}
                  <div className="mt-auto flex justify-between items-center">
                    <p className="text-xs text-muted-foreground truncate hidden sm:block">
                      Added to your order
                    </p>
                    <Button
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg h-9 px-3 ml-auto text-sm font-medium transition-colors"
                    >
                      <Trash2 className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Remove</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </ScrollReveal>

          {/* ORDER SUMMARY SIDEBAR (RIGHT COLUMN) */}
          <ScrollReveal
            direction="right"
            delay={0.2}
            className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-800 rounded-2xl p-6 lg:p-8 shadow-xl lg:sticky lg:top-32 relative"
          >
            <h2 className="text-xl font-bold mb-6 tracking-tight">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Fee</span>
                <span className="text-foreground font-medium">Free</span>
              </div>
              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-5 mt-5 flex justify-between items-center font-bold text-xl">
                <span>Total</span>
                <span className="text-foreground">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              asChild
              className="w-full h-12 rounded-xl bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-md shadow-orange-500/20 dark:shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 dark:hover:shadow-orange-500/30 hover:-translate-y-0.5 font-semibold text-base transition-all duration-300 mt-4 group border-0"
            >
              <Link href="/order" className="flex items-center justify-center">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-zinc-500 shrink-0" />
                <span>Secure 256-bit SSL encryption</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CreditCard className="w-4 h-4 text-zinc-500 shrink-0" />
                <span>We accept all major credit cards</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
