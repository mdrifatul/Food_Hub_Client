"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>

      <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>

      <p className="text-lg text-gray-600 mb-2">
        Thank you for your order. Your food will be delivered soon.
      </p>
      <p className="text-gray-500 mb-8">
        You will receive a confirmation email shortly with your order details.
      </p>

      <div className="flex gap-4 justify-center">
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button
          asChild
          className="bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
        >
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
