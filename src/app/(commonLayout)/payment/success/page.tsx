"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function PaymentSuccessPage() {
  useEffect(() => {
    document.title = "Payment Successful | FoodHub";
  }, []);

  return (
    <div className="border-gray-200 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Card className="p-8 space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-green-600 dark:text-green-400">
                Payment Successful!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your payment has been processed successfully. Your order is now
                being prepared.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button
                asChild
                className="bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                <Link href="/dashboard/orders">View My Orders</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Continue Browsing</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
