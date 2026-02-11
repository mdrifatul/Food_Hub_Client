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
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Order ID</p>
          <p className="font-semibold text-sm break-all">{order.id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Status</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isUpdating}>
              <Button
                variant="ghost"
                size="sm"
                className={`${statusColors[currentStatus]} px-3 py-1 h-auto`}
              >
                {currentStatus}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {statusOptions.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={status === currentStatus || isUpdating}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total</p>
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

      {order.user && (
        <div className="mb-4 pt-4 border-t">
          <p className="text-sm font-semibold mb-2">Customer Info</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{order.user.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{order.user.email}</p>
            </div>
            {order.user.phone && (
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="font-medium">{order.user.phone}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mb-4 pt-4 border-t">
        <p className="text-sm text-gray-600 mb-2">Delivery Address</p>
        <p className="font-semibold">{order.deliveryAddress}</p>
      </div>

      {order.items && order.items.length > 0 && (
        <div className="pt-4 border-t">
          <p className="text-sm font-semibold mb-3">Order Items</p>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium">
                    {item.meal?.title || `Meal #${item.mealId}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  {item.meal?.price && (
                    <p className="text-sm text-gray-600">
                      Price: ${(item.meal.price * item.quantity).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
