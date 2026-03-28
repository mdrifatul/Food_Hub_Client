"use client";

import { postOrder } from "@/action/order.action";
import { createCheckoutSession } from "@/action/payment.action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { useForm } from "@tanstack/react-form";
import { CreditCard, Loader2, ShieldCheck } from "lucide-react";
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
      <div className="border-gray-200 dark:bg-gray-950">
        <div className="container mx-auto px-4 py-16 text-center ">
          <h1 className="text-3xl font-bold mb-4">No Items in Cart</h1>
          <Button asChild>
            <Link href="/cart">Back to Cart</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-gray-200 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Order Confirmation</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b pb-4 last:border-b-0"
                    >
                      {item.imageUrl && (
                        <div className="relative h-20 w-20 shrink-0">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Address Form */}
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Delivery Address
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                  }}
                  className="space-y-4"
                >
                  <form.Field
                    name="address"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value) return "Address is required";
                      },
                    }}
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="123 Main Street"
                          required
                        />
                        {field.state.meta.errors && (
                          <p className="text-sm text-red-500">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      asChild
                      className="flex-1"
                    >
                      <Link href="/cart">Back to Checkout</Link>
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Redirecting to Payment...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Pay ${totalPrice.toFixed(2)}
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Stripe security notice */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 px-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>
                  Payments are securely processed by Stripe. Your card details
                  are never stored on our servers.
                </span>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-20">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

                <div className="space-y-3 mb-6 pb-6 border-b">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.title} x{item.quantity}
                      </span>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
