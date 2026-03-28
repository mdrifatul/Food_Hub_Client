"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  Receipt,
  Star,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { ReviewDialog } from "./review-dialog";

interface OrderCardProps {
  order: any;
}

const getStatusConfig = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return {
        icon: Clock,
        color: "text-muted-foreground",
        bg: "bg-muted",
        border: "border-border",
      };
    case "processing":
    case "accepted":
      return {
        icon: Package,
        color: "text-primary",
        bg: "bg-primary/10",
        border: "border-primary/20",
      };
    case "delivered":
    case "completed":
      return {
        icon: CheckCircle2,
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
      };
    case "cancelled":
    case "canceled":
      return {
        icon: XCircle,
        color: "text-destructive",
        bg: "bg-destructive/10",
        border: "border-destructive/20",
      };
    default:
      return {
        icon: Package,
        color: "text-muted-foreground",
        bg: "bg-muted",
        border: "border-border",
      };
  }
};

export function OrderCard({ order }: OrderCardProps) {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<{ id: string } | null>(null);

  const handleReviewClick = (mealId: string) => {
    setSelectedMeal({ id: mealId });
    setReviewDialogOpen(true);
  };

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <Card className="w-full overflow-hidden p-0 sm:p-0 py-0 gap-0 border shadow-none transition-all">
        {/* Header Summary */}
        <div className="bg-muted/30 p-4 sm:p-5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium tracking-tight text-foreground">
                Order #{order.id?.slice(0, 8).toUpperCase() || order.id}
              </span>
              <span className="text-muted-foreground/30 hidden sm:inline">
                •
              </span>
              <span className="text-xs font-normal text-muted-foreground">
                {formattedDate}
              </span>
            </div>
            {order.deliveryAddress && (
              <div className="flex items-start gap-1.5 text-xs text-muted-foreground max-w-md mt-0.5">
                <MapPin className="w-3 h-3 text-muted-foreground shrink-0 mt-0.5" />
                <span className="line-clamp-1" title={order.deliveryAddress}>
                  {order.deliveryAddress}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-5">
            <div className="flex flex-col sm:items-end">
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">
                Total
              </span>
              <span className="text-sm font-medium text-foreground">
                ${order.totalPrice?.toFixed(2) || "0.00"}
              </span>
            </div>
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-medium tracking-wide ${statusConfig.bg} ${statusConfig.border} ${statusConfig.color}`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              <span className="capitalize">{order.status}</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-4 sm:p-5">
          {order.items && order.items.length > 0 ? (
            <div className="flex flex-col gap-3">
              {order.items.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border bg-muted/40 hover:bg-muted/50 transition-colors gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800/50 border flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground text-sm">
                        {item.meal?.title ||
                          `Meal Item #${item.mealId.slice(0, 4)}`}
                      </h5>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Qty: {item.quantity}{" "}
                        {item.unitPrice
                          ? `× $${item.unitPrice.toFixed(2)}`
                          : ""}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReviewClick(item.mealId)}
                    className="w-full sm:w-auto h-8 text-xs font-medium bg-background hover:bg-muted"
                  >
                    <Star className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                    Leave Review
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-sm text-muted-foreground">
              No items in this order.
            </div>
          )}
        </div>
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
