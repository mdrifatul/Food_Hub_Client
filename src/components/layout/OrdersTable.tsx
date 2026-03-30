"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Order {
  id: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  meals?: Array<{
    mealId: string;
    mealName?: string;
    quantity: number;
    price: number;
  }>;
}

export const OrdersTable = ({ orders }: { orders: Order[] }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4 px-6">
                Order ID
              </TableHead>
              <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4">
                Customer
              </TableHead>
              <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4">
                Items
              </TableHead>
              <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4">
                Total
              </TableHead>
              <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4">
                Status
              </TableHead>
              <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4 px-6">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order: Order) => (
              <TableRow
                key={order.id}
                className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 border-b border-zinc-100 dark:border-zinc-800/60 transition-colors"
              >
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  <span className="text-zinc-400 dark:text-zinc-500 font-normal">
                    #
                  </span>
                  {order.id.slice(0, 8)}
                </TableCell>
                <TableCell className="py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {order.userName || "N/A"}
                  </div>
                </TableCell>
                <TableCell className="py-4 whitespace-nowrap text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {order.meals?.length || 1} item
                  {(order.meals?.length || 1) !== 1 ? "s" : ""}
                </TableCell>
                <TableCell className="py-4 whitespace-nowrap text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  ${order.totalPrice}
                </TableCell>
                <TableCell className="py-4 whitespace-nowrap">
                  <Badge
                    variant="secondary"
                    className={`font-semibold px-2.5 py-1 text-xs border-0 ${
                      order.status === "COMPLETED" ||
                      order.status === "DELIVERED"
                        ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : order.status === "PENDING" ||
                            order.status === "PROCESSING"
                          ? "bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                          : order.status === "CANCELLED"
                            ? "bg-red-500/10 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                            : "bg-blue-500/10 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                    }`}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 px-6 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">
                  {formatDate(order.createdAt)}
                </TableCell>
              </TableRow>
            ))}
            {(!orders || orders.length === 0) && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-zinc-500 dark:text-zinc-400"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
