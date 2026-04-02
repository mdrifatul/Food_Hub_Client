"use client";

import { postOrder } from "@/action/order.action";
import { createCheckoutSession } from "@/action/payment.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useCart } from "@/context/CartContext";
import { useForm } from "@tanstack/react-form";
import {
  ChevronLeft,
  CreditCard,
  MapPin,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function OrderPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      address: "",
    },
    onSubmit: async (values) => {
      await handlePlaceOrder(values.value.address);
    },
  });

  const handlePlaceOrder = async (address: string) => {
    setIsLoading(true);
    try {
      // Step 1: Create the order in the backend
      const orderData = {
        deliveryAddress: address,
        paymentMethod: "STRIPE" as const,
        items: items.map((item) => ({
          mealId: item.id,
          quantity: item.quantity,
        })),
      };

      const orderResult = await postOrder(orderData);

      if (orderResult?.error) {
        toast.error(orderResult.error);
        setIsLoading(false);
        return;
      }

      const orderId = orderResult?.data?.id;

      if (!orderId) {
        toast.error("Failed to create order. Please try again.");
        setIsLoading(false);
        return;
      }

      // Step 2: Create a Stripe Checkout Session for that order
      const paymentResult = await createCheckoutSession(orderId);

      if (paymentResult?.error) {
        toast.error(paymentResult.error);
        setIsLoading(false);
        return;
      }

      const checkoutUrl = paymentResult?.data?.url;

      if (!checkoutUrl) {
        toast.error("Failed to create payment session. Please try again.");
        setIsLoading(false);
        return;
      }

      // Step 3: Clear cart and redirect to Stripe Checkout
      clearCart();
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order. Please try again.");
      setIsLoading(false);
    }
  };

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
            No Items in Order
          </h1>
          <p className="text-muted-foreground mb-8 text-base">
            Your cart is currently empty. Please add some meals before
            proceeding to checkout.
          </p>
          <Button
            asChild
            className="rounded-xl bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg shadow-orange-500/20 dark:shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 dark:hover:shadow-orange-500/30 hover:-translate-y-0.5 px-8 h-12 text-base font-semibold transition-all duration-300 border-0"
          >
            <Link href="/cart">Back to Cart</Link>
          </Button>
        </ScrollReveal>
      </div>
    );
  }

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
            <Link href="/cart">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-500">
            Checkout
          </h1>
          <div className="ml-auto flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-foreground px-4 py-1.5 rounded-full text-sm font-semibold">
            <ShieldCheck className="w-4 h-4 text-zinc-500" /> Secure
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items Review Block */}
            <ScrollReveal
              direction="left"
              delay={0.1}
              className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-800 rounded-2xl p-6 lg:p-8 shadow-xl"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 tracking-tight">
                Review Items
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200/50 dark:border-zinc-800 items-center hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 group"
                  >
                    {item.imageUrl && (
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-zinc-200 dark:bg-zinc-900 rounded-lg">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Qty:{" "}
                        <span className="font-medium text-foreground">
                          {item.quantity}
                        </span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-lg text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Address Form Block */}
            <ScrollReveal
              direction="left"
              delay={0.2}
              className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-800 rounded-2xl p-6 lg:p-8 shadow-xl relative"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 tracking-tight">
                Delivery Details
              </h2>

              <form
                id="checkout-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
                className="space-y-6"
              >
                <form.Field
                  name="address"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) return "Delivery address is required";
                    },
                  }}
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <div className="space-y-2 group/input">
                        <Label
                          htmlFor="address"
                          className="flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors"
                        >
                          <MapPin className="w-4 h-4 text-muted-foreground transition-colors" />
                          Street Address
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="e.g. 123 Main Street, Apt 4B"
                          className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-500 transition-shadow shadow-xs focus-visible:shadow-sm text-base"
                          required
                        />
                        {isInvalid && (
                          <p className="text-sm font-medium text-red-500 mt-1">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />
              </form>

              {/* Stripe security notice inside the block */}
              <div className="mt-8 p-4 bg-zinc-50 dark:bg-zinc-950/50 rounded-xl border border-zinc-100 dark:border-zinc-800 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Payments are securely processed by Stripe. Your sensitive card
                  details are fully encrypted and never stored on our servers.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-1">
            <ScrollReveal
              direction="right"
              delay={0.3}
              className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-800 rounded-2xl p-6 lg:p-8 shadow-xl lg:sticky lg:top-32 relative"
            >
              <h3 className="text-xl font-bold mb-6 tracking-tight">
                Order Total
              </h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-muted-foreground"
                  >
                    <span className="truncate pr-4">
                      {item.quantity}x {item.title}
                    </span>
                    <span className="shrink-0 text-foreground font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-medium">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-foreground font-medium">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-5 mt-5 border-t border-zinc-100 dark:border-zinc-800">
                  <span>Total</span>
                  <span className="text-foreground">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                form="checkout-form"
                disabled={isLoading || items.length === 0}
                className="w-full h-12 rounded-xl bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-md shadow-orange-500/20 dark:shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 dark:hover:shadow-orange-500/30 hover:-translate-y-0.5 font-semibold text-base transition-all duration-300 mt-4 group border-0"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2 justify-center w-full">
                    <CreditCard className="w-5 h-5" />
                    Pay ${totalPrice.toFixed(2)}
                  </div>
                )}
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
