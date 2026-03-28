"use client";

import { updateOrderStatus } from "@/action/order.action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface OrderItem {
  id: string;
  mealId: string;
  quantity: number;
  meal?: {
    id: string;
    title: string;
    price: number;
  };
}

interface Order {
  id: string;
  status: string;
  totalPrice: number;
  deliveryAddress: string;
  createdAt: string;
  items: OrderItem[];
  user?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
}

interface OrderManagementCardProps {
  order: Order;
  onStatusUpdate?: () => void;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PREPARING: "bg-blue-100 text-blue-800",
  READY: "bg-green-100 text-green-800",
  DELIVERED: "bg-cyan-100 text-cyan-800",
};

const statusOptions: Array<"PENDING" | "PREPARING" | "READY" | "DELIVERED"> = [
  "PENDING",
  "PREPARING",
  "READY",
  "DELIVERED",
];

export function OrderManagementCard({
  order,
  onStatusUpdate,
}: OrderManagementCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus) return;

    setIsUpdating(true);
    try {
      const result = await updateOrderStatus(
        order.id,
        newStatus as "PENDING" | "PREPARING" | "READY" | "DELIVERED",
      );

      if (result?.error) {
        toast.error(result.error);
      } else {
        setCurrentStatus(newStatus);
        toast.success(`Order status updated to ${newStatus}`);
        onStatusUpdate?.();
      }
    } catch (error) {
      toast.error("Failed to update order status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group">
      <div className="h-1 w-full bg-linear-to-r from-orange-500 to-red-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>

      <div className="p-4 md:p-5">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
          {/* Left: ID & Date */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
              <span className="text-[11px] font-mono font-semibold text-zinc-600 dark:text-zinc-300">
                ID: {order.id.slice(-8).toUpperCase()}
              </span>
            </div>
            <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
              {new Date(order.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* Right: Status Update */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled={isUpdating}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${statusColors[currentStatus]} px-3 py-1 h-7 text-xs font-bold rounded-full border border-current shadow-xs hover:opacity-80 transition-opacity`}
                >
                  {currentStatus}
                  <ChevronDown className="ml-1.5 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xl border-zinc-200/50 dark:border-zinc-800/50 shadow-xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl supports-backdrop-filter:bg-white/80 dark:supports-backdrop-filter:bg-zinc-950/80">
                {statusOptions.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    disabled={status === currentStatus || isUpdating}
                    className="font-medium text-xs cursor-pointer rounded-lg mx-1 my-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800 transition-colors"
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Middle Row: Customer Info & Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-4">
          {order.user && (
            <div className="flex items-center gap-2 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></span>
              <span className="font-bold text-foreground truncate">
                {order.user.name}
              </span>
              <span className="text-zinc-500 truncate hidden sm:inline-block">
                ({order.user.email})
              </span>
              {order.user.phone && (
                <span className="text-zinc-500 hidden sm:inline-block">
                  • {order.user.phone}
                </span>
              )}
            </div>
          )}
          <div className="flex items-center gap-2 text-xs truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
            <span className="text-zinc-600 dark:text-zinc-400 font-medium truncate">
              {order.deliveryAddress}
            </span>
          </div>
        </div>

        {/* Bottom Row: Items inside a collapsed view box */}
        <div className="bg-zinc-50/80 dark:bg-zinc-900/40 rounded-xl p-3 border border-zinc-100 dark:border-zinc-800/80">
          <div className="space-y-1.5">
            {order.items?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold tracking-tight">
                    {item.meal?.title || `Meal #${item.mealId}`}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-500 bg-zinc-200/50 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                    x{item.quantity}
                  </span>
                </div>
                {item.meal?.price && (
                  <span className="font-bold text-zinc-600 dark:text-zinc-400 text-xs">
                    ৳{(item.meal.price * item.quantity).toLocaleString()}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 text-right border-t border-zinc-200 dark:border-zinc-800/60 sticky-total flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-widest font-black text-zinc-400">
              Total Charged
            </span>
            <span className="font-black text-lg text-orange-600 dark:text-orange-400">
              ৳{(order.totalPrice || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
