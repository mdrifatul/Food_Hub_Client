"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState } from "react";
import { ReviewDialog } from "./review-dialog";

interface OrderCardProps {
  order: any;
}

export function OrderCard({ order }: OrderCardProps) {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<{
    id: string;
  } | null>(null);

  const handleReviewClick = (mealId: string) => {
    setSelectedMeal({ id: mealId });
    setReviewDialogOpen(true);
  };

  return (
    <>
      <Card className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-semibold">{order.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className="font-semibold capitalize">{order.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Price</p>
            <p className="font-semibold">
              ${order.totalPrice?.toFixed(2) || "0.00"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date</p>
            <p className="font-semibold">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">Delivery Address</p>
          <p className="font-semibold">{order.deliveryAddress}</p>
        </div>
        {order.items && order.items.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-semibold mb-3">Items</p>
            <div className="space-y-3">
              {order.items.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">
                      {item.meal?.title || `Meal #${item.mealId}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReviewClick(item.mealId)}
                    className="ml-4"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {selectedMeal && (
        <ReviewDialog
          open={reviewDialogOpen}
          onOpenChange={setReviewDialogOpen}
          mealId={selectedMeal.id}
        />
      )}
    </>
  );
}
