import { getOrder } from "@/action/order.action";
import { OrdersTable } from "@/components/layout/OrdersTable";

export const dynamic = "force-dynamic";

const AllOrders = async () => {
  const { data: orders, error } = await getOrder();
  const orderList = Array.isArray(orders) ? orders : [];

  return (
    <div className="space-y-8 w-11/12 mx-auto py-8 lg:py-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900/50 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur-xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            All Orders
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
            Monitor and track all customer transactions. Total Orders: {orderList.length || 0}
          </p>
        </div>
      </div>

      <OrdersTable orders={orderList} />
    </div>
  );
};

export default AllOrders;
