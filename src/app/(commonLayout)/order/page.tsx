"use client";

import { postOrder } from "@/action/order.action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/user-cart";
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function OrderPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      address: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const orderData = {
          deliveryAddress: values.value.address,
          items: items.map((item) => ({
            mealId: item.id,
            quantity: item.quantity,
          })),
        };
        const result = await postOrder(orderData);
        if (result?.error) {
          toast.error(result.error);
          setIsLoading(false);
          return;
        }

        clearCart();

        toast.success("Order placed successfully!");
        router.push("/dashboard/orders");
      } catch (error) {
        toast.error("Failed to place order");
        setIsLoading(false);
      }
    },
  });

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
                      {isLoading ? "Processing..." : "Confirm Order"}
                    </Button>
                  </div>
                </form>
              </Card>
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
