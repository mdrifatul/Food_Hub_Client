"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/user-cart";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center border-gray-200 dark:bg-gray-950">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Button asChild>
          <a href="/">Continue Shopping</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="border-gray-200 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-16 ">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 border p-4 rounded-lg">
              {item.imageUrl && (
                <div className="relative h-24 w-24">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="font-bold">${item.price * item.quantity}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t pt-4">
          <div className="flex justify-between text-2xl font-bold mb-4">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Button className="float-right bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
            <Link href="/order">Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
