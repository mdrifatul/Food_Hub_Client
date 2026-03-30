import { getMyOrder } from "@/action/order.action";
import { OrderManagementCard } from "@/components/layout/order-management-card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ClipboardList } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const MyOrders = async () => {
  const orders = await getMyOrder();

  const orderList = Array.isArray(orders?.data?.data) ? orders?.data?.data : [];

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/20 relative pb-20 overflow-hidden pt-8">
      {/* Subtle Premium Glow */}
      <div className="absolute top-0 right-0 w-full h-125 bg-linear-to-b from-zinc-200/50 to-transparent dark:from-zinc-800/30 pointer-events-none blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <ScrollReveal
          direction="down"
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6"
        >
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
              <ClipboardList className="h-8 w-8 text-orange-500" />
              Manage{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
                Orders
              </span>
            </h1>
            <p className="text-muted-foreground font-medium text-lg">
              Track, update, and review all your incoming provider orders.
            </p>
          </div>
        </ScrollReveal>

        {!orderList || orderList.length === 0 ? (
          <ScrollReveal
            direction="up"
            className="text-center py-24 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xl max-w-3xl mx-auto"
          >
            <div className="w-24 h-24 mx-auto bg-orange-50 dark:bg-orange-500/10 rounded-full flex items-center justify-center mb-6 shadow-inner border border-orange-100 dark:border-orange-500/20 ring-8 ring-white dark:ring-zinc-950">
              <ClipboardList className="h-10 w-10 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
              No orders yet
            </h3>
            <p className="text-muted-foreground text-base max-w-md mx-auto font-medium leading-relaxed mb-8">
              You haven't received any orders yet. Once a customer places an
              order, it will appear here.
            </p>
            <Button
              asChild
              className="rounded-xl h-12 px-8 font-bold bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-md shadow-orange-500/20 border-0 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <Link href="/provider-dashboard">Return to Dashboard</Link>
            </Button>
          </ScrollReveal>
        ) : (
          <div className="space-y-6">
            {orderList.map((order: any, index: number) => (
              <ScrollReveal
                direction="left"
                delay={index * 0.1}
                key={order.id}
                className="transition-all hover:-translate-y-1"
              >
                <OrderManagementCard order={order} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
