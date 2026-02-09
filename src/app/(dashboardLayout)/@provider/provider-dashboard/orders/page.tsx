"use client";

import { OrderManagementCard } from "@/components/layout/order-management-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface Order {
  id: string;
  status: "pending" | "processing" | "ready" | "delivered" | "cancelled";
  totalPrice: number;
  deliveryAddress: string;
  createdAt: string;
  items: any[];
  user?: any;
}

export default function ProviderOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    let filtered = orders;

    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.deliveryAddress.toLowerCase().includes(query) ||
          order.user?.name?.toLowerCase().includes(query) ||
          order.user?.email?.toLowerCase().includes(query),
      );
    }

    setFilteredOrders(filtered);
  }, [orders, searchQuery, filterStatus]);

  const statusCount = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    ready: orders.filter((o) => o.status === "ready").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <div className="mb-8">
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-semibold mb-3">Filter by Status</p>
          <div className="flex gap-2 flex-wrap">
            {["PENDING", "PREPARING", "READY", "DELIVERED"].map((status) => (
              <Button
                key={status}
                onClick={() => setFilterStatus(status)}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-2 text-xs bg-gray-300 px-2 py-1 rounded">
                  {statusCount[status as keyof typeof statusCount]}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Display */}
      {isLoading ? (
        <Card className="p-8 text-center">
          <p className="text-gray-600">Loading orders...</p>
        </Card>
      ) : filteredOrders.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-600">
            {orders.length === 0
              ? "No orders yet. Check back soon!"
              : "No orders match your search or filter."}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
          {filteredOrders.map((order) => (
            <OrderManagementCard
              key={order.id}
              order={order}
              // onStatusUpdate={loadOrders}
            />
          ))}
        </div>
      )}
    </div>
  );
}
