"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="border-gray-200 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Card className="p-8 space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">
                Payment Cancelled
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your payment was not completed. Don&apos;t worry — no charges
                were made. You can try again anytime.
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
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
